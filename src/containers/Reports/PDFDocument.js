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
    },
    bottomMargin: {
        marginBottom: 16
    },
    padLeft: {
        paddingLeft: 32
    },
    red: {
        color: "red"
    },
    green: {
        color: "green"
    },
    borderingSide: {
        borderRight: "1px solid black"
    }
});

export default function PDFDocument(props) {
    let date = moment(props.data.created, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("dddd, MMMM Do YYYY")
    console.log("PDF Data: ", props.data)

    const prettyifyAttribute = (name) => {
        switch (name) {
            case 'underlying_price':
                return "Underlying Price"
            case 'strike_price':
                return "Strike Price"
            case 'quantity':
                return "Quantity"
            case 'maturity_date':
                return "Maturity Date"
        
            default:
                return "None"
        }
    }

    var created_trades = props.data.created_trades.map(function(trade, idx){
        return (
            <View key={idx}>
                <Text>• {trade.id}</Text>
                <Text style={styles.padLeft}>Buying Company: {trade.buying_party}</Text>
                <Text style={styles.padLeft}>Selling Company: {trade.selling_party}</Text>
                <Text style={styles.padLeft}>Product: {trade.product}</Text>
                <Text style={styles.padLeft}>Quantity: {trade.quantity}</Text>
                <Text style={styles.padLeft}>Underlying Price: {trade.underlying_price}</Text>
                <Text style={styles.padLeft}>Strike Price: {trade.strike_price}</Text>
                <Text style={styles.padLeft}>Maturity Date: {trade.maturity_date}</Text>
                <Text style={styles.padLeft}>Created: {moment(trade.date).fromNow()}</Text>
            </View>
            
        );
    });

    var deleted_trades = props.data.deleted_trades.map(function(trade, idx){
        return (<Text  key={idx}>• {trade.id}</Text>);
    });

    var edited_trades = props.data.edited_trades.map(function(trade, idx){
        return (
            <View key={idx}>
                <Text>• {trade.trade.id}</Text>
                {trade.edits.map(function(edit, idx) {
                    return (<Text key={idx} style={styles.padLeft}><Text style={styles.borderingSide}>{prettyifyAttribute(edit.attribute_edited)}</Text>  <Text style={styles.red}>{edit.old_value}</Text> -->  <Text style={styles.green}>{edit.new_value}</Text></Text>)
                })}
            </View>
        );
    });


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
                    <Text style={styles.bottomMargin}>New trades entered into the system today</Text>

                    {created_trades}
                    
                </View>
                    

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Edited Trades</Text>
                    <Text style={styles.bottomMargin}>Trades which have had their attributes edited today</Text>

                    {edited_trades}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deleted Trades</Text>
                    <Text style={styles.bottomMargin}>Trades which have been deleted today</Text>

                    {deleted_trades}
                </View>

            </Page>
        </Document>
    );
}