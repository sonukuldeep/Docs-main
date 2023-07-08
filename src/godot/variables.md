---
title: Variables
---

## Variables

In all programming languages, variables are used to store values and references. Examples are: the current score value or a reference to an item of inventory.

It is good practice to give variables descriptive names in lower-case text, and join words with underscores. Here are some examples of variable declarations:

```py
var score = 0
var remaining_fuel = 99.9
var paused = false
var player_name = ""
var selected_weapon
var starting_grid_position
```

Notice how some variables don’t have their value set yet, and we can assign different types of values to the variables.

Some basic types are as follows:

|  TYPE   |  DETAILS                           |  EXAMPLES    |
|---------|------------------------------------|--------------|
|  int    |  A 64bit signed number             |  -1254 0xAF  |
|  float  |  Floating point number             |  1.23 1e6    |
|  bool   |  True or False                     |  true false  |
|  String |  For words and character sequences |  Hello World |

### Variants

In our first example, the variables can take any type of value, and the value may be changed later to another type of value. This kind of variable is called a Variant.

So it is easy and quick to code our variable declarations in this way.

### Typed Variables

There is a way to declare what type of value a variable will accept. This has advantages to reduce bugs, and get help and warnings from the editor as you enter code.

There are two ways to declare typed variables as follows:

```py
# Method 1
var score: int = 0
var remaining_fuel: float = 99.9
var paused: bool = false
var player_name: String = ""

# Method 2 (inferring the type)
var my_int := 8
var size := 32.6
var running := true
var name := ""
```

We call this static typing, and when using variants as before, we call that dynamic typing. Both can be used as you like within your program.

### Variable Scope

Scope is the area of the program code where the variable is accessible. Text indentation levels are used to define scope in the editor, and the various regions may be expanded and collapsed.

Global scope is where the variable is available everywhere such as when it is declared in an Autoload file. And local scope is the area within a function containing the variable after its declaration.

It is good practice to keep the scope of a variable as small as possible to reduce bugs and make self-contained chunks of functionality that don’t depend on external variables.

Here is an example of global and local scope:

```py
extends Node2D

# score has global scope in this code module
var score = 5

# A function that may be called to add points to score
func add_to_score(points):
	# points is a variable passed from outside
	# it has local scope in this indented code block
	score = score + points

# This function runs when we view the scene
func _ready():
	add_to_score(1)
	# score is accessible inside this code block
	print(score) # prints 6
```

Bugs can creep in if you rely on global scope and mistakenly re-declare a variable with the same name in local scope. As in this example:

```py
extends Node2D

var score = 5
var new_score

func add_to_score(points):
	# new_score is accidentally re-declared
	# with local scope in this indented code block
	var new_score = score + points

func _ready():
	add_to_score(1)
	# new_score has not been set
	print(new_score) # prints null
```