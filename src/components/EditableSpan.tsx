import React, {ChangeEvent, useState} from 'react';
import {Tooltip} from "@mui/material";

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
      ? <input value={title} autoFocus onChange={onChangeHandler} onBlur={activateViewMode} style={{width: "130px"}}/>
      : <Tooltip title="Double click to change" placement="top-end">
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      </Tooltip>
  )
}