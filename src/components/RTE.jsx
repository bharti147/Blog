import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div>

    {label && <label>{label}</label>}
       <Controller
          name ={name || "content"}
          control = {control}
          render = {({field:onChange})=>(
            <Editor
              initialValue= {defaultValue}
              init = {{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [],
                toolbar: '',
              }}

             onEditorChange={onChange}
        
            />
          )}
       />
    </div>
  )
}

export default RTE
/*

Now, as our editor is designed as a separate component,
& we'll use it somewhere eventually like post form.
so , how wil we get reference from there.
we can use forwardRef hook  (but we'll not use it here)
we can also use Controller

PASS ALL THE PARAMETERS NEEDED in RTE component.

(control will be responsible for taking its states to main form)
name - we will pass here ,the name in parameter or   
       "content"
control - we will pass here, the control in parameter. 
         it will give the control to parent component, which will call it

render - for rendering elements, firstly put a callback
         then put all the values in it, which we will track
         jse onChange field m kuch change ho to inform
         
         now in rendering brackets=> jo bhi element
                      hme render krwana h like input field k liye input, editor k liye editor.
                      Here, show editor with values u need
                      (in onEditorChange value, pass our onChange)


NOW, to use it , we will create a folder named postform , a new file PostForm.jsx in it.
*/


/*
agr hme kisi form ka control chyie, is control ko pass krke rte m hm control le skte h uska,

getvalues- to gab values of form

in useform we can pass an object, in which we can values of our choice, (as key value pair) like:
 defaultValues

*/