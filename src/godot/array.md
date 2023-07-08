---
title: Array
---

## Arrays
Arrays are used to store lists of various elements, such as numbers or objects. Most times they are one dimensional but may be multi-dimensional for storing data related to grids or 3D space.

Each element of the array is referenced by an integer index value starting from zero for the first element.

An array is an object with various available helper functions to work with it such as for appending new values, getting the size of the array, sorting the values, and shuffling the values etc.

Since it is an object, it is passed into functions by reference, so changes made to its elements within a function call are made directly to the array object whose reference was passed to the function.

These code examples will help you to understand how to use GDScript Arrays:
```py
extends Node2D

func _ready():
	# Ways to create an array instance
	var a = Array()
	var b = []
	var c = ["a","b","c"]
	
	# Add some items to array 'a'
	a.append("Item 1")
	a.append("Item 2")
	
	# Pass array by reference to a function
	change(a)
	# Confirm that changes were made
	print(a[0])
	
	# Print the size of array 'b'
	print(b.size())
	
	# Shuffle the values of array 'c'
	c.shuffle() # This function doesn't return a value
	# Check that the element order was changed
	print_elements_of(c)
	
func change(a):
	a[0] = 1

func print_elements_of(array):
	# Here we are using one of the Pool array types
	print(PoolStringArray(array).join(""))
```