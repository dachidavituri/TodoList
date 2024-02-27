using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Data;
namespace TodoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;


        public TaskController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Task>>> GetAllTasks()
        {
            return Ok(await _context.Tasks.ToListAsync());

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTaskById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task == null)
            {
                return NotFound("Task not found");         
            }
            return Ok(task);
        }


        [HttpPost]
        public async Task<ActionResult<List<Task>>> CreateTask(Task task)
        {
            if (string.IsNullOrEmpty(task.TaskName) & string.IsNullOrEmpty(task.TaskStatus))
            {
                return BadRequest("TaskName and TaskStatus cannot be empty");
            }
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToArrayAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Task>>> UpdateTask(int id, Task updatedTask)
        {
            var eachTask = await _context.Tasks.FindAsync(id);
            if (eachTask == null)
            {
                return NotFound("Task not found");
            }

            if (string.IsNullOrEmpty(updatedTask.TaskName) || string.IsNullOrEmpty(updatedTask.TaskStatus))
            {
                return BadRequest("TaskName and TaskStatus cannot be empty");
            }

            eachTask.TaskName = updatedTask.TaskName;
            eachTask.TaskStatus = updatedTask.TaskStatus;

            await _context.SaveChangesAsync();

           
            return Ok(await _context.Tasks.ToListAsync());
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Task>>> DeleteTask(int id)
        {
            var eachTask = await _context.Tasks.FindAsync(id);
            if (eachTask == null)
            {
                return BadRequest("Each task was not found");
                
            }
            _context.Tasks.Remove(eachTask);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tasks.ToListAsync());
        }

    }
}
