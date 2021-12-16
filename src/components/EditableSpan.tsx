import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  title: string
  changeCallback: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.changeCallback(title)
  }

  return (
    editMode
      ? <input value={title} autoFocus onChange={onChangeHandler} onBlur={activateViewMode}/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}