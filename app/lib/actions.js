"use server"

import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

let client
let db
let boards
let users
let clients
let teamMembers

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db("cloudhub")
    boards = await db.collection("boards")
    users = await db.collection("users")
    clients = await db.collection("clients")
    teamMembers = await db.collection("teamMembers")
  } catch (error) {
    throw new Error("Failed to establish connection to database")
  }
}

export async function getBoards() {
  await init()
  const result = await boards.find({}).toArray()
  return JSON.parse(JSON.stringify(result))
}

export async function createClient(name) {
  await init()
  const result = await clients.insertOne({ name })
  return { success: true, client: { id: result.insertedId.toString(), name } }
}

export async function createTeamMember(name, email, role) {
  await init()
  const result = await teamMembers.insertOne({ name, email, role })
  return { success: true, teamMember: { id: result.insertedId.toString(), name, email, role } }
}

export async function createBoard(clientId, name, teamMemberIds) {
  await init()
  const result = await boards.insertOne({ clientId, name, teamMemberIds, tasks: [] })
  return { success: true, board: { id: result.insertedId.toString(), clientId, name, teamMemberIds, tasks: [] } }
}

export async function createTask(boardId, formData) {
  await init()
  const task = {
    id: new ObjectId().toString(),
    title: formData.get("title"),
    description: formData.get("description"),
    status: "Por hacer",
    priority: formData.get("priority"),
    storyPoints: Number.parseInt(formData.get("storyPoints")),
    assigneeId: formData.get("assigneeId") === "unassigned" ? null : formData.get("assigneeId"),
    relatedTasks: JSON.parse(formData.get("relatedTasks") || "[]"),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await boards.updateOne({ _id: new ObjectId(boardId) }, { $push: { tasks: task } })

  if (result.modifiedCount === 1) {
    return { success: true, task }
  }
  return { success: false, error: "Failed to create task" }
}

export async function updateTaskStatus(boardId, taskId, newStatus) {
  await init()
  const result = await boards.updateOne(
    { _id: new ObjectId(boardId), "tasks.id": taskId },
    { $set: { "tasks.$.status": newStatus, "tasks.$.updatedAt": new Date() } },
  )

  if (result.modifiedCount === 1) {
    return { success: true }
  }
  return { success: false, error: "Failed to update task status" }
}

export async function assignTask(boardId, taskId, userId) {
  await init()
  const result = await boards.updateOne(
    { _id: new ObjectId(boardId), "tasks.id": taskId },
    {
      $set: {
        "tasks.$.assigneeId": userId === "unassigned" ? null : userId,
        "tasks.$.updatedAt": new Date(),
      },
    },
  )

  if (result.modifiedCount === 1) {
    return { success: true }
  }
  return { success: false, error: "Failed to assign task" }
}

export async function getUsers() {
  await init()
  const result = await users.find({}).toArray()
  return JSON.parse(JSON.stringify(result))
}

export async function getClients() {
  await init()
  const result = await clients.find({}).toArray()
  return JSON.parse(JSON.stringify(result))
}

export async function getTeamMembers() {
  await init()
  const result = await teamMembers.find({}).toArray()
  return JSON.parse(JSON.stringify(result))
}

export async function importTasks(boardId, csvContent) {
  await init()
  const lines = csvContent.split("\n")
  const headers = lines[0].split(",")
  const tasks = lines.slice(1).map((line) => {
    const values = line.split(",")
    return {
      id: new ObjectId().toString(),
      title: values[1].replace(/^"|"$/g, ""),
      description: values[2].replace(/^"|"$/g, ""),
      status: values[3],
      priority: values[4],
      storyPoints: Number.parseInt(values[5]),
      assigneeId: values[6] || null,
      relatedTasks: values[7] ? values[7].replace(/^"|"$/g, "").split(";") : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  const result = await boards.updateOne({ _id: new ObjectId(boardId) }, { $push: { tasks: { $each: tasks } } })

  if (result.modifiedCount === 1) {
    return { success: true, tasks }
  }
  return { success: false, error: "Failed to import tasks" }
}

