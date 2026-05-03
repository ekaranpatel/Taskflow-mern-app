import React from 'react'
import Todoitem from './Todoitem'
import { Sparkles } from "lucide-react";
const Todolist = ({
    todos,
    editingId, 
  onDelete, 
  onStartEdit, 
  onCancelEdit, 
  onSaveEdit 

}) => {

console.log("todos:", todos);
 
    if (todos.length === 0) {
        return (
            <div className="text-center max-w-2xl m-auto py-16 backdrop-blur-2xl bg-white/5 rounded-2xl border border-white/0">
                <div className="w-16 h-16 bg-linear-to-br from-violet-500/20  to-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles size={32} className="text-violet-300" />
                </div>
                <p className="text-white/90 text-base font-semibold mb-1">
                    {" "}
                    No tasks yet
                </p>
                <p className="text-white/50 text-sm">
                    Create your first task to get started
                </p>
            </div>
        );
    }
    
      

    return (
        <>
            <div className="space-y-2">
                {todos.map((todo, index) => (
                    <Todoitem
                        key={todo._id  }  
                    todo={todo}
                    index={index}
                    editingId={editingId}
                    onDelete={onDelete}          
                    onStartEdit={onStartEdit}  
                    onCancelEdit={onCancelEdit}  
                    onSaveEdit={onSaveEdit}
                        
                    />
                ))}
            </div>
        </>
         
    ); 

}

export default Todolist;
