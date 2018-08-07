const express=require('express');
const app=express();
const cmd=require('node-cmd');
const fs=require('fs');
const firebase=require('firebase');
const controller=require('./controller.js');

var config = {
    apiKey: "AIzaSyD1H8pGZ6hrj7SsB5_JS175gu6UHvAXNDU",
    authDomain: "valkyrie-muj.firebaseapp.com",
    databaseURL: "https://valkyrie-muj.firebaseio.com",
    projectId: "valkyrie-muj",
    storageBucket: "valkyrie-muj.appspot.com",
    messagingSenderId: "256721948000"
    };

firebase.initializeApp(config);


app.use('/', express.static('./public_static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/submit_quiz', (req, res)=>{

    body=req.body;
    controller.setQuizData(body.year, body.quiz_id);
    res.redirect("/form.html");
})

app.post('/submit_question', (req, res)=>{

    body=req.body;
    controller.addQuestion(body.quiz_id, {

        text: body.text,
        title: body.title,
        id: body.question_id,
        input: body.input,
        output: body.output,
        constraints: {
             var: {
                 lower_bound: body.lower_bound,
                 upper_bound: body.upper_bound,
                 names: body.names
             },
             
             other: body.optional.split("\n")

        },
        code_template: body.code_template


    })

    res.redirect("/form.html");
})

function writeToFile(filename, content, callback)
{
    return fs.writeFile(filename, content, callback);
}

function compare(givenOutput, expectedOutput)
{
    givenOutput=givenOutput.split(" ");
    expectedOutput=expectedOutput.split(" ");
    numberMatched=0;
    upperBound=Math.min(givenOutput.length, expectedOutput.length);
    for (i=0; i<upperBound; i++)
    {
        if(givenOutput[i]==expectedOutput[i])
        {
            numberMatched++;

        }

 
    }

    return numberMatched;

            
}

function getInput(question_id)
{
    
}

function getOutput()
{
    return "2";
}


app.post('/run', (req, res)=>{

    runObject=req.body;
    userId=runObject.id;
    source=runObject.source;
    question=controller.getQuestion(runObject.question_id)
    input=question.input;
    //getInput();
    output=question.output;

    console.log(input);

    cmd.get('ls', (err, data, stderr)=>{

        cmd.get('cat kishore.c', (err, data, stderr)=>{ console.log(data)});
    })

    writeToFile("./"+"tempfiles"+"/"+userId+"input", input,()=>{

        writeToFile("./"+"tempfiles"+"/"+userId+".c", source,()=>{

            cmd.get('gcc '+userId+'.c -o '+ userId, (err, data, stderr)=>{

                console.log("p");

                if(err)
                {
                    console.log(err);
                    sendObj={
                        error: err,
                        accepted: 0,
                        testCasesPassed: 0,
                    }

                    res.send(JSON.stringify(sendObj));
                }

                else
                { 
                    cmd.get('timeout 1s ./'+userId+' <'+userId+"input", (err, data, stderr)=>{

                        if(err)
                        {
                            console.log(err);
                        }
                        console.log(data);
                        results=compare(data, output)
                        
                        if(results==output.length)
                        {
                            sendObj={

                                error:"",
                                accepted: 1,
                                testCasesPassed: results

                            }
                            res.send(JSON.stringify(sendObj));
                        }

                        else
                        {
                            sendObj={
                                error:"",
                                accepted: 0,
                                testCasesPassed: results
                            }

                            res.send(JSON.stringify(sendObj));
                        }

                    })

             }
            })
        })
    
    })
   


})

app.listen(4000)