import React from "react";

export default function Habit({ habit, toggleHabit }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={habit.complete}
                onChange={() => {
                    toggleHabit(habit.id);
                }}
            />
            {habit.name}
        </div>
    );
}
