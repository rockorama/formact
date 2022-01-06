import { useState } from 'react'
import Form from 'formact'

import './App.css'
import TextField from './components/TextField'
import Checkbox from './components/Checkbox'
import SubmitButton from './components/SubmitButton'

type MyForm = {
  name: string
  email: string
  keepLoggedIn: boolean
  notHere: boolean
}

function App() {
  const [output, setOutput] = useState('')

  return (
    <div className="App">
      <Form<MyForm>
        initialState={{ valid: false }}
        onSubmit={(payload) => {
          console.log(payload.values.name, payload.values.notHere)
          setOutput(JSON.stringify(payload, null, '<br />'))
          payload.onFinish()
        }}
        onChange={(payload) =>
          setOutput(JSON.stringify(payload, null, '<br />'))
        }>
        <TextField name="name" label="Name" required />
        <TextField name="email" type="email" label="Email" required />
        <Checkbox name="keepLoggedIn" label="Keep Logged in?" />
        <SubmitButton />
      </Form>

      <div
        style={{
          textAlign: 'left',
          padding: 20,
        }}
        dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  )
}

export default App
