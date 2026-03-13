# Quick Fix: Data Not Showing

## 🔴 Problem Identified
Your MongoDB is likely **not running**. That's why you can't see the data!

## ✅ Solution (Step-by-Step)

### Step 1: Start MongoDB

**Open Command Prompt as Administrator** and run:

```bash
net start MongoDB
```

**If you see "service name is invalid"**, try:
```bash
mongod --dbpath="C:\data\db"
```

**Alternative:** Use MongoDB Compass
1. Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Open it and connect to `mongodb://localhost:27017`
3. If it connects successfully, MongoDB is running!

---

### Step 2: Seed the Database

Once MongoDB is running, open a **new terminal** in the `server` folder:

```bash
cd C:\Users\ASUS\Downloads\jwellers\server
node seedDatabase.js
```

**Expected Output:**
```
 Connected to MongoDB
  Clearing existing data...
 Creating categories...
 Created 32 categories
 Creating products...
 Created 14 products

🎉 Database seeded successfully!
```

---

### Step 3: Verify Data

Run the test script:
```bash
node testConnection.js
```

**Expected Output:**
```
✅ Connected to MongoDB successfully!

📊 Database Statistics:
   📦 Products: 14
   📁 Categories: 32

📌 Sample Product:
   Name: Diamond Solitaire Ring
   Price: ₹85,000
   ...
```

---

### Step 4: Start Backend Server

```bash
npm run dev
```

**You should see:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

### Step 5: Start Frontend

Open a **new terminal** in the `client` folder:

```bash
cd C:\Users\ASUS\Downloads\jwellers\client
npm run dev
```

---

### Step 6: Test in Browser

1. Open http://localhost:5173
2. Navigate to products page
3. You should see products!

**For Admin Panel:**
1. Create an admin user first
2. Visit http://localhost:5173/admin

---

## 🆘 Still Not Working?

### Check #1: MongoDB Status
```bash
sc query MongoDB
```

If it says "RUNNING" = Good ✅  
If it says "STOPPED" or error = Run `net start MongoDB`

### Check #2: Port Conflicts
Make sure nothing else is using ports 5000 (backend) or 5173 (frontend)

### Check #3: Environment Variables
Check `server/.env` file exists with:
```env
MONGODB_URI=mongodb://localhost:27017/jwellers
PORT=5000
JWT_SECRET=your-secret-key-here
```

### Check #4: Dependencies
```bash
cd server
npm install

cd ../client
npm install
```

---

## 🎯 Quick Command Reference

```bash
# Start MongoDB
net start MongoDB

# Seed database
cd server
node seedDatabase.js

# Test connection
node testConnection.js

# Start backend
npm run dev

# Start frontend (in new terminal)
cd client
npm run dev
```

---

## 📞 Need Help?

Send me:
1. Output of `sc query MongoDB`
2. Output of `node testConnection.js`
3. Any error messages you see

I'll help you fix it immediately! 🚀
