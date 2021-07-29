import { Chart, Tooltip, Coord, StackBar, Legend } from "viser-react";
import * as React from "react";
import axios from "axios";
import Auth from "../../../auth/Auth";

import "./Pie.css";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            colors: [],
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Chart
                forceFit
                data={this.state.data}
                height={400}
                padding={[50, 50, 50, 50]}
            >
                <Tooltip />
                <Legend position="right-center" offsetX={-500} />
                <Coord type="theta" radius={0.75} />
                <StackBar
                    position="completed_times"
                    color={["name", this.state.colors]}
                    style={{
                        stroke: "white",
                        lineWidth: 1,
                    }}
                    label={[
                        "completed_times",
                        function (completed_times) {
                            if (completed_times < 10) {
                                return null;
                            } else {
                                return {
                                    offset: -30,
                                    textStyle: {
                                        fill: "white",
                                        fontSize: 14,
                                        shadowBlur: 2,
                                        shadowColor: "rgba(0, 0, 0, .45)",
                                    },
                                };
                            }
                        },
                    ]}
                />
            </Chart>
        );
    }
}
