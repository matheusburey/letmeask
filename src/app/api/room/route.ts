import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get("roomId")
  if (roomId === "sala_teste") return NextResponse.json({ error: "Room ID not found" }, { status: 404 })
  return NextResponse.json({ roomId: roomId })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const roomId = "sala_teste"
  return NextResponse.json({ roomId: roomId })
}