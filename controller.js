const admin=require('firebase-admin');

const serviceAccount=require("./valkyrie-muj-firebase-adminsdk-26gex-3c18cc6514.json")

admin.initializeApp({

    credential: admin.credential.cert(serviceAccount)
})

var db=admin.firestore();

function getRef(collection, document)
{

    var docRef=db.collection(collection).doc(document);
    return docRef;
}

function setQuizData(quiz_year, quizId)
{
    var docRef=getRef('year', quiz_year);
    getRef('quizzes', quizId);
    docRef.get().then(doc=>{

        if(!doc.exists)
        {
            quizzes=[];
            quizzes.push(quizId);

            docRef.set({

                quizzes: quizzes
                
            })
        }
        
        else
        {
            data=doc.data();
            quizzes=data.quizzes;
            quizzes.push(quizId);
            docRef.set({quizzes: quizzes});
            console.log(data);
        }
    })
}

function addQuestion(quiz_id, question)
{
    var docRef=getRef('quizzes', quiz_id);
    question_id=question.id;
    docRef.get().then((doc)=>{

        if(!doc.exists)
        {
            questions=[];
            questions.push(question_id);
            docRef.set({questions: questions});
        }

        else
        {
            data=doc.data();
            questions=data.questions;
            questions.push(question_id);
            docRef.set({questions: questions});
        }
    })


    var questionRef=getRef('questions', question_id);
    questionRef.set({

        text: question.text,
        title: question.title,
        input: question.input,
        output: question.output,
        constraints: question.constraints,
        code_template: question.code_template
    })
    //docRef.set();
}

function getQuestion(question_id)
{
    var docRef=getRef('questions', question_id);
    return docRef.get();
}



module.exports={setQuizData, addQuestion, getQuestion};

