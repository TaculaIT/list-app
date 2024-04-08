import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";

function App() {
  const [groceryLists, setGroceryLists] = useState([
    { id: 1, name: "Apples", quantity: 5, checked: false },
    { id: 2, name: "Bananas", quantity: 8, checked: false },
    { id: 3, name: "Milk", quantity: 2, checked: false },
    { id: 4, name: "Bread", quantity: 3, checked: false },
    { id: 5, name: "Eggs", quantity: 12, checked: false },
  ]);

  const [sortBy, setSortBy] = useState("");
  const [editingItem, setEditingItem] = useState(null); // State to hold the item being edited

  const addItem = (newItem) => {
    setGroceryLists([...groceryLists, newItem]);
  };

  const deleteItem = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;
    const updatedList = groceryLists.filter((item) => item.id !== id);
    setGroceryLists(updatedList);
  };

  const strikeItem = (id) => {
    const updatedList = groceryLists.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setGroceryLists(updatedList);
  };

  const editItem = (item) => {
    setEditingItem(item); // Set the item being edited
  };

  const saveEditedItem = (editedItem) => {
    const updatedList = groceryLists.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setGroceryLists(updatedList);
    setEditingItem(null); // Clear the editing state
  };

  const sortList = (option) => {
    let sortedList = [...groceryLists];
    switch (option) {
      case "name":
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "input":
        sortedList.sort((a, b) => a.id - b.id);
        break;
      case "amount":
        sortedList.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        break;
    }
    setGroceryLists(sortedList);
    setSortBy(option);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <TaskAdd addItem={addItem} />
        <div>
          <select onChange={(e) => sortList(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="name">Sort by Name</option>
            <option value="input">Sort by Input</option>
            <option value="amount">Sort by Amount</option>
          </select>
          {sortBy && <p>Sorted by: {sortBy}</p>}
        </div>
        <ItemList
          groceryLists={groceryLists}
          deleteItem={deleteItem}
          strikeItem={strikeItem}
          editItem={editItem} // Pass editItem function to ItemList component
          saveEditedItem={saveEditedItem} // Pass saveEditedItem function to ItemList component
          editingItem={editingItem} // Pass editingItem state to ItemList component
        />
        <Footer items={groceryLists} />
      </header>
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1>Karlo's List</h1>
      <img
        src="/kid_shop.jpg"
        alt="Banner"
        style={{ width: "100%", height: "100px" }}
      />
    </div>
  );
}

function TaskAdd({ addItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim() || isNaN(parseInt(quantity))) {
      alert("Please enter a valid name and quantity.");
      return;
    }
    const newItem = {
      id: Date.now(),
      name,
      quantity: parseInt(quantity),
      checked: false,
    };
    addItem(newItem);
    setName("");
    setQuantity("");
  };

  return (
    <div id="form" className="header">
      <h3>My Grocery List</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          style={{ height: "40px" }}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity..."
          style={{ height: "40px" }}
        />
        <button type="submit" className="addBtn" style={{ height: "40px" }}>
          Add
        </button>
      </form>
    </div>
  );
}

function ItemList({
  groceryLists,
  deleteItem,
  strikeItem,
  editItem,
  saveEditedItem,
  editingItem,
}) {
  return (
    <div className="grocery-list">
      {groceryLists.map((item) => (
        <div key={item.id} className={item.checked ? "checked" : ""}>
          {editingItem && editingItem.id === item.id ? (
            <div>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  editItem({ ...editingItem, name: newName });
                }}
              />
              <input
                type="number"
                value={editingItem.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  editItem({ ...editingItem, quantity: newQuantity });
                }}
              />
              <button onClick={() => saveEditedItem(editingItem)}>Save</button>
            </div>
          ) : (
            <p>
              <span onClick={() => strikeItem(item.id)}>
                {item.checked ? <del>{item.name}</del> : item.name} |{" "}
                {item.quantity}x{" "}
              </span>{" "}
              <button onClick={() => deleteItem(item.id)}>
                <img
                  src="/trash.jpg"
                  className="fas fa-trash"
                  alt="Delete"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
              <button onClick={() => strikeItem(item.id)}>
                <img
                  src="/check.jpg"
                  className="fas fa-check"
                  alt="Strike"
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#345623",
                  }}
                />
              </button>
              <button onClick={() => editItem(item)}>Edit</button>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
