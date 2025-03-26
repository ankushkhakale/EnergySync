import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // In a real app, you would:
    // 1. Validate the input
    // 2. Check if user already exists
    // 3. Hash the password
    // 4. Store the user in a database

    // For demo purposes, we'll just return a success response
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "user",
    }

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during signup" }, { status: 500 })
  }
}

