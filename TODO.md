1. Get typeORM to work with cockroachdb DONE
2. implement service layer STARTED
3. implement the controller layer and hook it up with the router layer STARTED
4. setup the injestify to inject the dependancies automatically TODO

index listens to requests coming to the app -> the app has routers connected to it -> routers have controllers -> controllers have services 

Repositories are like objects that allow you to interact with specific tables in the db

get the injection lib setup so you dont have to inject it manually