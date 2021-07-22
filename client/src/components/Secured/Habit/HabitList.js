import React from "react";
import Habit from "./Habit";

export default function HabitPage({ habits, toggleHabit }) {
    return (
        <div>
            {habits &&
                habits.map((habit) => {
                    return (
                        <Habit
                            key={habit.id}
                            habit={habit}
                            toggleHabit={toggleHabit}
                        />
                    );
                })}
        </div>
    );
}
