---
title: Functions
---

## Functions
Functions are a way to group together sections of code that perform related actions. They help us to write more readable code and avoid repeating the same code in multiple places.

A square root function may be familiar. It has an input and returns an output. Functions may have zero or multiple inputs, and optionally return a result.

Functions always belong to a Class which is a container for related functions. So when you extend a Node in Godot, you are creating a Class containing your functions and variables.

Your extended class will also inherit the functions and properties of the class that it extends. Properties are member variables that are declared in the top-most scope of the class.

### Code Entry Points

One of the inherited functions is the _ready function. This is called by the Engine for each Node that enters the scene tree. We are able to override this function in order to have it run our initialization code.

Another inherited function that we may override is the _process(delta) function. This is called by the Engine for every frame of video. The delta input value is the elapsed time since the previous frame. In this function, we may insert code that drives the activity of our game.

These built-in functions have an underscore prefix in the names. For our custom functions, we will likely name them in the same way as variables.

If you were wondering “where is the entry point to my code?”, then you can see that it is via the built-in functions that we may override. They get called by the Engine at times of initialization, input events, and during traversal of the game loop.

Here is how we might start developing our game code:
```py
extends Node2D

# Declare member variables here.
var player
var enemies
var score

# Called when the node enters the scene tree for the first time.
func _ready():
	add_enemies()
	get_player_details()

func add_enemies():
	pass # Add code to do this later

func get_player_details():
	pass # Add the code later

# Called every frame.
func _process(delta):
	process_inputs(delta)
	process_enemy_activity(delta)
	update_score()

func process_inputs(delta):
	pass

func process_enemy_activity(delta):
	pass

func update_score():
	pass
```

We used a declarative programming approach here, where we describe what we want to do (with the function names), but we don’t know what code will implement it yet.

### Function Inputs

Inputs to functions are called arguments. There may be no arguments, a list of arguments, type specified arguments, and arguments with default values.

### Function Return Values

The return keyword is used to return at any point. This means exiting the function with a value or not (returns a null value) to the point in the program code just after where the function was called from.

If the return keyword is not used, then the code will run to the end of the function and return a null value.

The return value doesn’t have to be used, just call the function without capturing it’s return value. But this may generate a warning in the error window if the value is not null to alert you to a potential bug in your code logic.

Also, the return type may be specified to add extra bug resistance.

Here are examples of ways to define functions in a working example script:

```py
extends Node2D

# Called when the node enters the scene tree for the first time.
func _ready():
	add(5, 6) # Prints 11 to Output window
	var sum = get_sum(2, 4) # Sets sum to 6
	var my_int = add_ints(sum, 4) # Sets my_int to 10
	my_int = times_2(my_int) # sets my_int to 20
	move_x(self, my_int) # Move this node 20 pixels along x axis
	move_x(self) # Move by the default value

# This function has no return value
func add(a, b):
	print(a + b)

# This function returns a value
func get_sum(a, b):
	return a + b

# This function will only accept integer arguments
func add_ints(a: int, b: int):
	return a + b

# Generate an error if the return value is not an int
func times_2(n) -> int:
	return 2 * n

# This function modifies an object that is passed by reference
func move_x(node: Node2D, dx = 1.5):
	node.position.x += dx
```

In the above code you can see that the node’s property is altered without returning the node value. This works because the node value is a reference number to an object, and the object is said to be passed by reference. Contrast this to a simple number that is passed by value where it has local scope to the function and needs to be returned to make use of the new value.

### Notes

Everything inside a function has to be finished before the next frame can appear on screen (unless you are using yield, which would turn your function into a coroutine).