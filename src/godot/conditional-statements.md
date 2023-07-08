---
title: Conditional statement
---

## Conditional Statements

Conditional Statements allow us to control the flow of our program execution. If the code statements only executed one after the other until the end of a function, the functionality would be very limited.

Once upon a time, flow-charts were popular (maybe they still are?) where we could design our program flow with decision nodes to decide which branch to go down. Typically, we would test a condition for true or false and branch accordingly.

In a game, we are likely to have simple true/false conditions to test or, a more complex state with several possibilities.

GDScript provides *if* and *match* as two ways to write our conditional logic

The basic conditional statement uses the if / else / elif syntax. We use indentation to define the levels for how deep into the if structure we are. Here are some GDScript code examples:

### if

```py
extends Node2D

func _ready():
	var n = 6
	
	# Inline 'if' statement
	if n == 6: print("n is equal to six")
	
	n = 4
	# Regular 'if' statement 
	if n == 4:
		print("n is equal to four")
	
	# 'else/if' statement
	if n == 6:
		print("n is equal to six")
	else:
		print("n is not equal to six")
	
	# Messy indented 'else/if' statement
	if n == 6:
		print("n is equal to six")
	else:
		if n < 6:
			print("n is less than six")
		else:
			print("n is greater than six")
	
	n = 8
	# Tidier 'else/if' statement using 'elif'
	if n == 6:
		print("n is equal to six")
	elif n < 6:
		print("n is less than six")
	else:
        print("n is greater than six")
```

In the above code, you can see how indentation can get messy where there is more than one if test, so elif may be used to make the code tidier.

### match

A match statement is used to branch execution of a program. It's the equivalent of the switch statement found in many other languages, but offers some additional features.

Basic syntax:-
```py
match (expression):
    [pattern](s):
        [block]
    [pattern](s):
        [block]
    [pattern](s):
        [block]
```

### Note:-

- match is more type strict than the == operator. For example 1 will not match 1.0. The only exception is String vs StringName matching: for example, the String "hello" is considered equal to the StringName &"hello".
- The special continue behavior in match supported in 3.x was removed in Godot 4.0.

### Control flow:

The patterns are matched from top to bottom. If a pattern matches, the first corresponding block will be executed. After that, the execution continues below the match statement.

### There are 6 pattern types:

- Constant pattern
    Constant primitives, like numbers and strings:
```py
match x:
    1:
        print("We are number one!")
    2:
        print("Two are better than one!")
    "test":
        print("Oh snap! It's a string!")
```

- Variable pattern
    Matches the contents of a variable/enum:
```py
match typeof(x):
    TYPE_FLOAT:
        print("float")
    TYPE_STRING:
        print("text")
    TYPE_ARRAY:
        print("array")
```

- Wildcard pattern
    This pattern matches everything. It's written as a single underscore.

	It can be used as the equivalent of the default in a switch statement in other languages:
```py
match x:
    1:
        print("It's one!")
    2:
        print("It's one times two!")
    _:
        print("It's not 1 or 2. I don't care to be honest.")
```

- Binding pattern
    A binding pattern introduces a new variable. Like the wildcard pattern, it matches everything - and also gives that value a name. It's especially useful in array and dictionary patterns:
```py
match x:
    1:
        print("It's one!")
    2:
        print("It's one times two!")
    var new_var:
        print("It's not 1 or 2, it's ", new_var)
```

- Array pattern
    Matches an array. Every single element of the array pattern is a pattern itself, so you can nest them.

	The length of the array is tested first, it has to be the same size as the pattern, otherwise the pattern doesn't match.

	Open-ended array: An array can be bigger than the pattern by making the last subpattern ..

	Every subpattern has to be comma-separated.
```py
match x:
    []:
        print("Empty array")
    [1, 3, "test", null]:
        print("Very specific array")
    [var start, _, "test"]:
        print("First element is ", start, ", and the last is \"test\"")
    [42, ..]:
        print("Open ended array")
```

- Dictionary pattern
	Works in the same way as the array pattern. Every key has to be a constant pattern.

	The size of the dictionary is tested first, it has to be the same size as the pattern, otherwise the pattern doesn't match.

	Open-ended dictionary: A dictionary can be bigger than the pattern by making the last subpattern ..

	Every subpattern has to be comma separated.

	If you don't specify a value, then only the existence of the key is checked.

	A value pattern is separated from the key pattern with a :
```py
match x:
    {}:
        print("Empty dict")
    {"name": "Dennis"}:
        print("The name is Dennis")
    {"name": "Dennis", "age": var age}:
        print("Dennis is ", age, " years old.")
    {"name", "age"}:
        print("Has a name and an age, but it's not Dennis :(")
    {"key": "godotisawesome", ..}:
        print("I only checked for one entry and ignored the rest")
```

- Multiple patterns
	You can also specify multiple patterns separated by a comma. These patterns aren't allowed to have any bindings in them.
```py
match x:
    1, 2, 3:
        print("It's 1 - 3")
    "Sword", "Splash potion", "Fist":
        print("Yep, you've taken damage")
```

### Ternary-if Expressions

This is a handy one-liner to assign a value to a variable based on a condition.

var x = [value] if [expression] else [value]

Code example:
```py
var paid = false
var strength = 9.9 if paid else 1.0
print("Strength = ", strength)
```
