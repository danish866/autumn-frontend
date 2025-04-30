#!/bin/bash

git add .

if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
    exit 0
fi
modified_files=$(git diff --name-only --cached )


commit_date="2025-04-30 11:14:50" #year-month-day

for file in $modified_files; do
    git commit --date="$commit_date" -m "changes" $file

    commit_date=$(date -d "$commit_date + 1 day" "+%Y-%m-%d 01:13:50")
done

git push origin main

exit 0
