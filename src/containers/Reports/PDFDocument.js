import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
  } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 12,
        fontSize: 16
    },
    title: {
        color: "#3A456E",
        fontWeight: 700,
        fontSize: 22,
        textAlign: "center",
        marginTop: 12
    },
    infoRow: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 16
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        color: "#3A456E",
        fontSize: 20,
        fontWeight: 500
    }
});

export default function PDFDocument(props) {
    let date = moment(props.data.date, "DD-MM-YYYY").format("dddd, MMMM Do YYYY")
    console.log("PDF Data: ", props.data)
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>{date}</Text>
                <View style={styles.infoRow}>
                    <Text>New Trades: {props.data.num_of_new_trades}</Text>
                    <Text >Edited Trades: {props.data.num_of_edited_trades}</Text>
                    <Text>Deleted Trades: {props.data.num_of_deleted_trades}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>New Trades</Text>
                    <Text>New trades entered into the system today</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Edited Trades</Text>
                    <Text>Trades which have had their attributes edited today</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deleted Trades</Text>
                    <Text>Trades which have been deleted today</Text>
                </View>

            </Page>
        </Document>
    );
}