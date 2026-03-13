# 🚨 Fix ERR_CONNECTION_REFUSED Error

Your frontend can't connect to the backend because the **backend server is NOT running**.

## ✅ Solution: Start 3 Terminals in This Order

### Terminal 1: MongoDB Server
```cmd
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
```
**Status:** Keep running ✅
**Expected Output:** "Waiting for connections on port 27017"

---

### Terminal 2: Seed Database (ONE TIME ONLY)
```cmd
cd c:\Users\ASUS\Downloads\jwellers\server
node seed-necklaces.js
```
**Expected Output:** 
- ✅ Category created
- ✅ Created 10 products
- 📊 Database Summary

---

### Terminal 3: Backend Server
```cmd
cd c:\Users\ASUS\Downloads\jwellers\server
npm run dev
```
**Expected Output:**
- ✅ MongoDB connected successfully
- 🚀 Server running on port 5000

---

### Terminal 4: Frontend (Already Running)
```cmd
cd c:\Users\ASUS\Downloads\jwellers\client
npm run dev
```
**Status:** Already running on port 5173 ✅

---

## 🔍 Checklist Before Starting Backend

- [ ] MongoDB is running (Terminal 1)
- [ ] Database has been seeded (Terminal 2 - run once)
- [ ] Now start backend (Terminal 3)
- [ ] Refresh browser at http://localhost:5173

---

## ⚠️ If Backend Still Won't Start

Check server terminal for errors like:
- "MongoDB connection error" → MongoDB not running
- "Port 5000 already in use" → Kill existing process
- "Cannot find module" → Run `npm install` first
