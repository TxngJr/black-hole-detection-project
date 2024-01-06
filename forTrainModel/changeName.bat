@echo off
setlocal enabledelayedexpansion
set "prefix=neg"
set "extension=.jpg"
set "counter=1"

for %%F in (*.jpg) do (
    ren "%%F" "!prefix!!counter!!extension!"
    set /a "counter+=1"
)

echo Renaming complete.

