import React, { useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import addresses from "../contract/addresses.json";
import logo from "../assets/logo.png";
import check from "../assets/check.png";
import uncheck from "../assets/uncheck.png";

const useStyle = makeStyles({
    root: {
        backgroundColor: "rgb(186, 206, 255)",
    },
    tableHead: {
        backgroundColor: "rgb(126, 163, 255)",
    },
    tableCell: {
        color: "rgb(31, 35, 255)",
        fontSize: "17px",
        fontWeight: "bold",
    },
});

export default function Main() {
    const wallet = useWallet();
    const [account, setAccount] = useState(null);
    const [data, setData] = useState([]);
    const [btnFlag, setBtnFlag] = useState(true);

    const classes = useStyle();

    useEffect(() => {
        setAccount(wallet.account);
    }, [wallet.status]);

    useEffect(() => {
        if (account !== null && wallet.status === "connected") {
            getBalance();
        }
    }, [account]);

    useEffect(() => {
        if (data !== [] && wallet.status === "connected") {
            var mem = true;
            for (var x of data) {
                if (x.flag) mem = false;
                else {
                    mem = true;
                    break;
                }
            }
            setBtnFlag(mem);
        }
    }, [data]);

    const ETHERrequestAPI = async (address) => {
        return await axios.post(
            "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=" +
                address +
                "&address=" +
                account +
                "&page=1&offset=100&startblock=13616789&endblock=14135189&sort=asc&apikey=" +
                addresses.ETHERMYAPI
        );
    };

    const getBalance = async () => {
        var bump = [];
        const ShibaInuResult = await ETHERrequestAPI(addresses.ShibaInu);
        console.log(ShibaInuResult);
        const ShibaInuObj = {
            name: "Shiba Inu",
            address: addresses.ShibaInu,
            flag: ShibaInuResult.data.result[0] ? true : false,
        };
        bump.push(ShibaInuObj);
        const SpellResult = await ETHERrequestAPI(addresses.Spell);
        console.log(SpellResult);
        const SpellObj = {
            name: "Spell",
            address: addresses.Spell,
            flag: SpellResult.data.result[0] ? true : false,
        };
        bump.push(SpellObj);
        const DogelonResult = await ETHERrequestAPI(addresses.Dogelon);
        console.log(DogelonResult);
        const DogelonObj = {
            name: "Dogelon (ELON)",
            address: addresses.Dogelon,
            flag: DogelonResult.data.result[0] ? true : false,
        };
        bump.push(DogelonObj);
        setData(bump);
    };

    const claimHandler = async () => {
        alert("Claimed");
    };

    return (
        <>
            <Container>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item sm={12}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={2} sm={3} md={4} lg={5}></Grid>
                            <Grid item xs={8} sm={6} md={4} lg={2}>
                                <img src={logo} alt="" className="logoImg" />
                            </Grid>
                            <Grid item xs={2} sm={3} md={4} lg={5}></Grid>
                        </Grid>
                    </Grid>
                    <button
                        className="claimButton"
                        onClick={claimHandler}
                        disabled={btnFlag}
                    >
                        Claim
                    </button>
                    <Grid item xs={12}>
                        <br />
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                                className={classes.root}
                            >
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            Address
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((list) => (
                                        <TableRow key={list.address}>
                                            <TableCell>{list.name}</TableCell>
                                            <TableCell>
                                                {list.address}
                                            </TableCell>
                                            <TableCell>
                                                {list.flag ? (
                                                    <img
                                                        src={check}
                                                        alt=""
                                                        className="status"
                                                    />
                                                ) : (
                                                    <img
                                                        src={uncheck}
                                                        alt=""
                                                        className="status"
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <br />
            </Container>
        </>
    );
}
