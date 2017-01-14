echo time to commit
echo %1
call git add ../
call git commit -m %1
call git push

exit
