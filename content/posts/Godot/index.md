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
- [Operators](#operators)

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

<hr />

## Operators
These are mostly used in calculations, comparisons, and operations on binary bits.

They are evaluated in order of importance (precedence).

For example, in a calculation: times (x) takes precedence over plus (+) so 2 + 3 x 2 equals 8 rather than 10. A good calculator should obey this precedence rule. For an exercise: check it on your smartphone calculator app.

The following tables list operators with the highest precedence first.

### Mathematical Operators

| OPERATOR | DESCRIPTION                |
|----------|----------------------------|
| -x       | Negation                   |
| * / %    | Times / Divide / Remainder |
| +        | Add                        |
| -        | Subtract                   |

The remainder is applied to integers and works like this: 5 % 2 equals 1 because 5 divided by 2 equals 2 remainder 1.

One good use for this operator (otherwise known as the modulo operator) is to limit the range of a counter value. If the divisor is n, then the counter will count between 0 and n - 1, rolling back to zero on each multiple of n. Look forward to a code example using this concept later in the tutorial series.

Some assignment shortcuts are available as follows (these have the lowest precedence over anything - as you might assume given that they are accepting the result of a prior evaluation):

| EXAMPLE | EQUIVALENT OPERATION |
|---------|----------------------|
| x += 1  | x = x + 1            |
| x -= 1  | x = x - 1            |
| x *= 2  | x = x * 2            |
| x /= 2  | x = x / 2            |
| x %= 3  | x = x % 3            |

### Boolean Operators

These are the comparison, and logical operators that are mainly used in if statements.

| OPERATORS       | DESCRIPTION          |
|-----------------|----------------------|
| < == > != >= <= | Comparison operators |
| ! not           | NOT                  |
| && and          | AND                  |
| \|\| or         | OR                   |

A common typo error is to enter just one equals sign meaning assign rather than compare, but the editor will detect this and signal a warning to you.

The result of a boolean operation is true or false.

Example: x = 3 > 4 or 5 < 6 # x == true

### Bitwise Operators

Note: bitwise operators are not likely to be used very often unless you are doing something quite technical involving bit manipulation.

Every number or character consists of binary bits, so we are able to flip bits, shift bits, mask bits etc. Individual bits are zeros and ones. They are set or reset according to logical operations related to how digital logic gates operate.

The first bit is called the LSB (Least Significant Bit) and the last bit is called the MSB (Most Significant Bit). Numbers constructed from zero or one bits are binary numbers.

Counting in binary goes like this: 0 1 10 11 100 101 110 111 1000 …

However, in the editor, we only see decimal equivalent numbers. So you will need to imagine the binary equivalent of 8 is 1000.

For an exercise: use the programmer’s calculator in Windows (or the equivalent app in your OS) to get used to fooling around with binary numbers.

| OPERATOR | DESCRIPTION                                                               |
|----------|---------------------------------------------------------------------------|
| ~        | NOT (inverts the bits)                                                    |
| << >>    | Shift bits of left-side operand left or right by n position (1 << 2 == 4) |
| &        | Logical AND of two values                                                 |
| \|       | Logical OR of two values                                                  |
| &= \|=   | Assignment shortcuts                                                      |

### Short Circuit Evaluation

An expression containing logical operators is evaluated from left to right. This means that as soon as the condition must be true or false then the rest of the expression does not need to be evaluated. This makes the evaluation faster.

With this knowledge we may order the parts of our expression such that the most important or faster parts are placed to the left.

For example: a variable that references an object may be null which evaluates to false in a logical expression, but would cause an error if we try to run a method of the object where it is null.

Here are some examples:
```py
func _ready():
    var x = 4
    var y = 6
    if x < y or x > 0: # Only x < y needs to be evaluated here
        print("ok")
    var label = Label.new()
    # Here we ensure that label exists before evaluating
    # the right side of the expression.
    if label and label.text == "":
        label.text = "Hello"
```

<hr/>

## Functions
Functions are a way to group together sections of code that perform related actions. They help us to write more readable code and avoid repeating the same code in multiple places.

A square root function may be familiar. It has an input and returns an output. Functions may have zero or multiple inputs, and optionally return a result.

Functions always belong to a Class which is a container for related functions. So when you extend a Node in Godot, you are creating a Class containing your functions and variables.

Your extended class will also inherit the functions and properties of the class that it extends. Properties are member variables that are declared in the top-most scope of the class.

## Code Entry Points

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