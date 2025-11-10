/**
 * Script to create an admin user
 * Run with: node scripts/create-admin.js
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://easysearch-server.vercel.app";

const adminData = {
  name: "Admin User",
  email: "admin@rajshahi.com",
  contactNumber: "+8801777123456",
  password: "Admin@123456",
  profilePhoto: "https://ui-avatars.com/api/?name=Admin+User&background=0891b2&color=fff&size=200"
};

async function createAdmin() {
  try {
    console.log("🔄 Creating admin user...");
    console.log("API URL:", API_BASE_URL);
    console.log("\nAdmin Details:");
    console.log("Name:", adminData.name);
    console.log("Email:", adminData.email);
    console.log("Contact:", adminData.contactNumber);
    console.log("Password:", adminData.password);
    console.log("\n");

    const response = await fetch(`${API_BASE_URL}/api/v1/users/create-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log("✅ Admin created successfully!");
      console.log("\n📋 Login Credentials:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Email:", adminData.email);
      console.log("Password:", adminData.password);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("\n🚀 You can now login at: http://localhost:3000");
      console.log("\n✨ Response:", JSON.stringify(result, null, 2));
    } else {
      console.error("❌ Failed to create admin:");
      console.error("Status:", response.status);
      console.error("Response:", JSON.stringify(result, null, 2));

      if (result.message && result.message.includes("already exist")) {
        console.log("\n💡 Admin user already exists! You can use these credentials:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Email:", adminData.email);
        console.log("Password:", adminData.password);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      }
    }
  } catch (error) {
    console.error("❌ Error creating admin:");
    console.error(error.message);
    console.error("\nMake sure the API server is running and accessible.");
  }
}

createAdmin();
