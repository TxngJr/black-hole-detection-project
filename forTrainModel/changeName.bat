@echo off
setlocal enabledelayedexpansion
set "prefix=maleo"
set "extension=.png"
set "counter=1"

for %%F in (*.png) do (
    ren "%%F" "!prefix!!counter!!extension!"
    set /a "counter+=1"
)

echo Renaming complete.
