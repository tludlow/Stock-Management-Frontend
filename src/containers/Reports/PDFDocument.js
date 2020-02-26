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
                    <Text>New Trades: {props.data.newTradeCount}</Text>
                    <Text >Edited Trades: {props.data.editedTradeCount}</Text>
                    <Text>Deleted Trades: {props.data.deletedTradeCount}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>Erroneous Trades: {props.data.erroneousTradeCount}</Text>
                    <Text>User Corrected Trades: {props.data.userCorrectionsCount}</Text>
                    <Text>System Corrected Trades: {props.data.systemCorrectionsCount}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>New Trades</Text>
                    <Text>Trades which have been created today in the system</Text>
                </View>

            </Page>
        </Document>
    );
}