import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { palette } from '../../ui-kit/theme';
const NUMBER_OF_TRIES = 6;
type Props = {
    word: string;
};

const Board: React.FC<Props> = ({ word }) => {
    const letters = word.split(""); // ['h', 'e', 'l', 'l', 'o']
    const [rows, setRows] = useState(
        new Array(NUMBER_OF_TRIES).fill(new Array(5).fill(""))
    );
    const [curRow, setCurRow] = useState(0);
    const [curCol, setCurCol] = useState(0);
    const isCellActive = (row: any, col: any) => {
        return row === curRow && col === curCol;
    };

    const getCellBGColor = (row: any, col: any) => {
        const letter = rows[row][col];

        if (row >= curRow) {
            return palette.black;
        }
        if (letter === letters[col]) {
            return palette.primary;
        }
        if (letters.includes(letter)) {
            return palette.secondary;
        }
        return palette.darkgrey;
    };
    return (
        <View style={styles.map}>
            {rows.map((row, i) => (
                <View key={`row-${i}`} style={styles.row}>
                    {row.map((letter: any, j: any) => (
                        <View
                            key={`cell-${i}-${j}`}
                            style={[
                                styles.cell,
                                {
                                    borderColor: isCellActive(i, j)
                                        ? palette.grey
                                        : palette.darkgrey,
                                    backgroundColor: getCellBGColor(i, j),
                                },
                            ]}
                        >
                            <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    cell: {
        borderWidth: 3,
        borderColor: palette.darkgrey,
        flex: 1,
        maxWidth: 70,
        aspectRatio: 1,
        margin: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    cellText: {
        color: palette.lightgrey,
        fontWeight: "bold",
        fontSize: 28,
    },
    row: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "center",
    },
    map: {
        alignSelf: "stretch",
        marginVertical: 20,
    },
});