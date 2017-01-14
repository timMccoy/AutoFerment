echo time to commit

call git add ../
call git commit -m %1
call git push

exit
