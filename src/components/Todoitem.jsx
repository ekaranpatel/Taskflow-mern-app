import React, { useState } from 'react';
import { Save, X, Edit2, Trash2 } from "lucide-react";

function Todoitem({ 
  todo, 
  editingId, 
  onDelete, 
  onStartEdit, 
  onCancelEdit, 
  onSaveEdit 
}) {
  const isEditing = editingId === todo._id;
 
  const [editText, setEditText] = useState(todo.tasks);

  const handleSave = () => {
    onSaveEdit(todo._id, editText);
  };

  return (
    <div className={`group w-[50vw] m-auto backdrop-blur-2xl bg-white/5 hover:bg-white/10 rounded-xl p-3 flex items-center gap-3 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 ${todo.completed ? "opacity-50" : ""}`}>
      
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-white/10 border border-purple-500/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            autoFocus
          />
        ) : (
          <span className={`font-medium text-sm duration-300 ${todo.completed ? "line-through text-white/40" : "text-white"}`}>
            {todo.tasks}
          </span>
        )}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {isEditing ? (
          <>
            <button 
              onClick={ handleSave }
              className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-emerald-500/30"
            >
              <Save size={14} />
            </button>
            <button 
              onClick={onCancelEdit}
              className="w-7 h-7 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => onStartEdit(todo._id)}
              className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-blue-500/30"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={() => onDelete(todo._id)}
              className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-rose-500/30"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Todoitem;