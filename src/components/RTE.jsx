import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { plugin } from 'postcss'

export default function RTE({name, control, label, defaultValue=""}) {


  return (
    <div className=''>
    {label && <label className=''>{label}</label>}

    <Controller
      name={name || 'content'}
      control={control}
      render= {({field: {onChange}})=>(
        <Editor
         initialValue={defaultValue}
         init={
          {
            height:500,
            menubar:true,
            plugins:[
              "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:[ "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help"],
            content_style: "body {ont-family:Helvetica,Arial,sans-serif; font-size:14px}"
      }
         }
         onEditorChange={onChange}
        />
      )}


    />
      
    </div>
  )
}


