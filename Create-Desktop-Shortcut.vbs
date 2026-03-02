Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.SpecialFolders("Desktop") & "\Anonymous Feedback App.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "D:\GitHubProjects\anonymous-feedback-app\START.bat"
oLink.WorkingDirectory = "D:\GitHubProjects\anonymous-feedback-app"
oLink.Description = "Start Anonymous Feedback App"
oLink.Save
MsgBox "Desktop shortcut created!", vbInformation, "Success"
