import React,{useState} from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import './ProgrammingForm.css';

const ProgrammingForm = () => {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [stdin, setStdin] = useState('');
    const data = { name: name, language: language, code: code, input: stdin };
    const PostData= async () =>{
        axios.post('http://localhost:3001/api/form/submit', data)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    }
    // useEffect(() => {
    //     PostData();
    // });
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, language, code, stdin);
        PostData();
         // console.log(data);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className='name'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
    
            <div className='language'>
                <label htmlFor="language">Language:</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="c_cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
            </div>
            <div className='code'>
                <label htmlFor="code">Code:</label>
                <Editor
                height="60vh"
                width={'103%'}
                value={code}
                defaultLanguage={language}
                defaultValue="// write your code here"
                onChange={(value) => setCode(value)}
                options={{minimap: {enabled: true,side: 'right',renderCharacters: true,maxColumn: 120},
                            fontSize: 13,
                            scrollbar:{verticalScrollbarSize: 10,horizontalScrollbarSize: 10},
                            wordWrap: 'on',
                }}
                />
            </div>
            <div className='stdin'>
                <label htmlFor="stdin">Standard Input:</label>
                <textarea
                    id="stdin"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                />
            </div>
            <div className='button'>
                <button className='submit' type="submit">Submit</button>
            </div>
            
        </form>
    );
}



export default ProgrammingForm;