
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, Plus, Save, StickyNote, Trash2, X } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthContext';

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface ResourceNotesProps {
  resourceId: string;
  resourceName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceNotes: React.FC<ResourceNotesProps> = ({
  resourceId,
  resourceName,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState('');
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Load notes and tasks from localStorage on mount
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const savedNotes = localStorage.getItem(`notes-${resourceId}`);
      const savedTasks = localStorage.getItem(`tasks-${resourceId}`);
      
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [resourceId, isOpen, isAuthenticated]);

  // Save notes and tasks to localStorage when they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(`notes-${resourceId}`, JSON.stringify(notes));
      localStorage.setItem(`tasks-${resourceId}`, JSON.stringify(tasks));
    }
  }, [notes, tasks, resourceId, isAuthenticated]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString(),
    };
    
    setNotes([...notes, note]);
    setNewNote('');
    
    toast({
      title: "Note Added",
      description: "Your note has been saved",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    
    toast({
      title: "Note Deleted",
      description: "Your note has been removed",
    });
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    
    toast({
      title: "Task Added",
      description: "Your task has been added to the list",
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "Task Deleted",
      description: "Your task has been removed",
    });
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <p className="mb-4">Please login to add notes and tasks to resources.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {resourceName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 ${activeTab === 'notes' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'tasks' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
        </div>
        
        {activeTab === 'notes' ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this resource..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddNote} size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save Note
              </Button>
            </div>
            
            <div className="mt-4 space-y-3">
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No notes yet. Add your first note about this resource.
                </p>
              ) : (
                notes.map(note => (
                  <div key={note.id} className="bg-muted/50 p-3 rounded-md relative group">
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    <div className="text-xs text-muted-foreground mt-2 flex justify-between items-center">
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task for this resource..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <Button onClick={handleAddTask} size="sm">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
            
            <div className="mt-4 space-y-2">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tasks yet. Add your first task for this resource.
                </p>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${task.completed ? 'bg-primary/10' : 'bg-muted/50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleToggleTask(task.id)}
                        className={`h-5 w-5 rounded-full flex items-center justify-center ${
                          task.completed ? 'bg-primary text-primary-foreground' : 'border border-input'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </button>
                      <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-destructive opacity-50 hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceNotes;
