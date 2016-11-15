// TypeScript file
interface Observer
{
    Onchange(data);
}

class TaskService
{
    observers:Observer[] = [];
    fun(){
        for(var i in this.observers)
        {
            var data;
            this.observers[i].Onchange(data);
        }
    }
}

class NPC implements Observer
{
    status:number;
     Onchange(data)
     {
         this.status = data;
     }
}