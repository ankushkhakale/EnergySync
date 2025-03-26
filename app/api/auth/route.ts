import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@energysync.com",
    password: "password", // In a real app, this would be hashed
    role: "admin",
    company: "Acme Inc",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (user && user.password === password) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      })
    }

    // Return error if authentication fails
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during authentication" }, { status: 500 })
  }
}

