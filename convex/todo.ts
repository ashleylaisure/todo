import { ConvexError, v } from "convex/values";
import {mutation, query} from "./_generated/server";

// CREATE
export const addTodo = mutation({
    args: {text: v.string()},

    handler: async(ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false
        })
        return todoId;
    }
})
// READ - getTodos
export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect()
        return todos
    }
})
// UPDATE - updateTodo
export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string(),
    },
    handler: async(ctx, args) => {
        await ctx.db.patch(args.id, {text: args.text})
    }
})

// DELETE - deleteTodo
export const deleteTodo = mutation({
    args: {id: v.id("todos")},
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id)
    }
})

// DELETE All
export const deleteAllTodos = mutation({
    handler: async (ctx) => {
        // get all todos
        const todos = await ctx.db.query("todos").collect()

        // dlete all todos
        for (const todo of todos) {
            await ctx.db.delete(todo._id)
        }

        return {deletedCount: todos.length}
    }
})

// MARK STATUS - markTodoAsCompleted
export const toogleTodo = mutation({
    args: {id: v.id("todos")},

    handler: async(ctx, args) => {
        const todo = await ctx.db.get(args.id)
        if(!todo) throw new ConvexError("Todo not found")

        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })
    }
})