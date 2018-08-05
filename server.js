const express=require('express');
const app=express();
const cmd=require('node-cmd');
const fs=require('fs');
const firebase=require('firebase');

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

function writeToFile(filename, content, callback)
{
    return fs.writeFile(filename, content, callback);
}

function compare(givenOutput, expectedOutput)
{
    givenOutput=givenOutput.split("\n");
    expectedOutput=expectedOutput.split("\n");
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

function getInput()
{
    return "1";
}

function getOutput()
{
    return "2";
}


app.post('/run', (req, res)=>{

    runObject=req.body;
    userId=runObject.id;
    source=runObject.source;
    input=getInput();
    output=getOutput();

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
                }
    
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

                            accepted: 1,
                            testCasesPassed: results

                        }
                        res.send(JSON.stringify(sendObj));
                    }

                    else
                    {
                        sendObj={
                            accepted: 0,
                            testCasesPassed: results
                        }

                        res.send(JSON.stringify(sendObj));
                    }

                })
            })
        })
    
    })
   


})

app.listen(4000)