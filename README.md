# email-scheduler
API to schedule and send emails using nodejs,express,mongodb,node-cron & send-grid.

This provides routes to schedule an email, reschedule it, get email info by id, get all emails, get all failed/unsent emails, delete emails by id.

# About routes

## 1. Schedule an email (create) : POST {{host}}/emails/
 
    takes the following(All mandatory) as request body in JSON :
    
    - to : String
    - subject : String
    - text : String (content of email)
    - when : Date String in MM-DD-YYYY HH:mm (24 hour format)
    
## 2. Reschedule : PATCH {{host}}/emails/{id}

     takes the following as request body in JSON :

    - to : String
    - subject : String
    - text : String (content of email)
    - when : Date String in MM-DD-YYYY HH:mm (24 hour format)
    
    Takes id of email as path param.
    
    Used to reschedule any scheduled/failed email. Cannot reschedule/update already sent emails.
    
## 3. List all emails : GET {{host}}/emails/
    
## 4. Get email by id : GET {{host}}/emails/{id}

    Takes id of email as path param.
    
## 5.  Delete email by id : DELETE {{host}}/emails/{id}

    Takes id of email as path param.
    
## 6. List all unsent/failed emails : GET {{host}}/emails/unsent
    
