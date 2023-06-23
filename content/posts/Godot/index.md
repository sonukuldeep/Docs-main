---
title: Godot GdScript
date: "2023-06-22"
template: "post"
draft: false
slug: "/posts/gdscript"
category: "Godot"
tags:
  - "GameDev"
  - "Godot"
  - "GdScript"
description: "GDScript is a dynamically typed scripting language made specifically for free and open source game engine Godot. GDScript's syntax is similar to Python's. Its main advantages are ease of use and tight integration with the engine."
socialImage: "./media/picture.png"
---

<figure class="float-center" style="width: 240px">
	<img src="/media/picture.png" alt="Godot">
	<figcaption>Godot</figcaption>
</figure>

# GdScript
GDScript is a high-level, object-oriented, imperative, and gradually typed programming language built for Godot. It uses an indentation-based syntax similar to languages like Python. Its goal is to be optimized for and tightly integrated with Godot Engine, allowing great flexibility for content creation and integration.

GDScript is entirely independent from Python and is not based on it.

## Table of Contents
- [Numbers](#numbers)
- [Variables](#variables)

## Numbers

Numbers are an important type of data in any computer program. GDScript supports integers and floating point values. And both types may be positive or negative.

We might assign numbers to variables. Then the value may be passed around and changed. If it’s important that the value should not be changed then it should be assigned to a constant.

Here are some examples of number assignments. Comments start with a # character.

```py
# Integers
var a = 1
var b = -23
var c = 0
var d = 0xA1Fe316 # hexadecimal

# Floats
var x = 1.0
var y = -43.01
var z = 1.3e6

# Constant
const THE_ANSWER = 42
```

Pre-defined constants include: PI, TAU, INF (infinity)

For an exercise, write code to print numbers to the Output window of the Editor.

Ideas to play around with:
- What happens if you try to change the value of a constant?
- Try entering a floating point value with an exponent like 3e6 (3 million)
- What happens if you enter crazy large numbers?
- Does it matter what case you use for hex digits?
- Use the built-in constants to see their output values

Here is a code template for this to get started:

```py
extends Node2D

const SPEED = 75
var number = SPEED

# Called when the node enters the scene tree for the first time.
func _ready():
	# Print the value to the Output window of the editor
	print(number)
	number = 86
	print(number)
```

### Enums

Enums are useful for defining several related constants where you don’t care about the value that is automatically assigned by the engine e.g. enum {COLD, WARM, HOT}

### A bit more about numbers stored on a computer

Computer chips store data as sequences of 1’s and 0’s in binary. Each value is a bit. Integers are stored as 64 bits. This limits the range of integer values.

If you keep adding 1 to an integer it will reach the maximum positive value (63 1’s), and then, adding another 1 will flip the sign bit (the 64th bit), as all the preceding 1’s carry the new 1 over (in binary arithmetic), giving the maximum negative value. Then we start counting back towards zero and up to the maximum positive value again.

So the number wraps around. Do you think that this is better than having a show-stopping (crash) overflow error?

### Number Wrapping

In a game, it can be useful to have numbers wrap around. For example, a position coordinate along a repeating terrain. Maybe the terrain x-coordinate is mapped as an integer, and the terrain height is drawn up and down as you move along it as a function of x?

But you may want your warrior to traverse the terrain for as long as the game lasts. So, if x is an integer that wraps around, you don’t need to worry about an error occurring when the maximum value of x is reached during the final stages of an e-sports tournament.

### Integers

Integers are ideal for counters, index values, and ID numbers where whole numbers are wanted. Even the most popular multiplayer game is unlikely to run out of unique ID numbers for players using integers. Yeah, but watch out for the bots!

### Floating Point Numbers

Floating point numbers are used a lot for anything else such as amounts, angles, lengths etc. They are not so good as integers for exact comparisons such as A equals zero since there are precision errors to consider. For example: 0.0001 looks like a close enough approximation to zero, but it is actually greater than zero in code.

### Conclusion

When mixing numbers in calculations and assignments, casting takes place when the type of number is changed. This can lead to unexpected results unless we take precautions. Look forward to exploring this interesting topic in a future tutorial.

<hr/>

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
