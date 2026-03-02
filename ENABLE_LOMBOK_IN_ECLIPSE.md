# Enable Lombok in Eclipse - Quick Guide

## The Issue
You're getting errors like "The method getUsername() is undefined for the type User" because Lombok annotations (@Data, @Builder, etc.) aren't being processed by Eclipse.

## Solution: Enable Lombok Annotation Processing

### Step 1: Enable Annotation Processing in Project
1. **Right-click your project** → **Properties**
2. Go to **Java Compiler** → **Annotation Processing**
3. ✅ Check **"Enable annotation processing"**
4. ✅ Check **"Enable processing in editor"**  
5. Click **Apply and Close**

### Step 2: Clean and Rebuild
1. **Project** → **Clean...** → Select your project → **Clean**
2. **Project** → **Build Project**

### Step 3: Restart Application
1. Stop the running application (Red square button)
2. Right-click `AnonymousFeedbackApplication.java` → **Run As** → **Spring Boot App**

## If That Doesn't Work: Install Lombok JAR in Eclipse

1. **Download Lombok**:
   - Go to: https://projectlombok.org/download
   - Or find it in: `C:\Users\YourName\.m2\repository\org\projectlombok\lombok\1.18.30\lombok-1.18.30.jar`

2. **Run Lombok Installer**:
   ```cmd
   java -jar lombok-1.18.30.jar
   ```

3. **Install to Eclipse**:
   - The installer window will open
   - It should auto-detect Eclipse
   - Click **"Install / Update"**
   - **Restart Eclipse**

4. **Clean and Rebuild** again after restarting

## Alternative: Use Manual Getters/Setters (What we're doing now)
I've already started adding manual getters/setters to fix the immediate issue!

