# Generic market deployments

Use **per-market pages** in the sidebar for product context (tokens, oracles, parameters). **Use this page** for cross-market registries: every Harbor **protocol** proxy on [Ethereum mainnet](#mainnet-harbor-deployment-proxies) and [MegaETH](#megaeth-harbor-deployment-proxies) with **CREATE3 salt strings**, plus shared [Bao Factory](../contracts/bao-factory.md) metadata.

## Generic information

| Item | Value |
| ---- | ----- |
| **BaoFactory proxy** (CREATE3 deployer) | `0xD696E56b3A054734d4C6DCBD32E11a278b0EC458` |
| **Source of truth** | JSON under [`baofinance/harbor` → `deployments`](https://github.com/baofinance/harbor/tree/main/deployments) — refresh this page when state manifests change |
| **Feeds & oracle docs** | Feed inventory and aggregator behavior: [Mainnet price oracles](../contracts/price-oracles/mainnet.md), [MegaETH price oracles](../contracts/price-oracles/megaeth.md). The MegaETH proxy table below includes the Harbor **stETH/USD** wrapped aggregator used by the live MegaETH minter. |
| **CREATE3 salt strings** | Recorded in manifests; scripts derive the `bytes32` passed to BaoFactory — see [Bao Factory](../contracts/bao-factory.md) |

## Mainnet Harbor deployment proxies

This table lists **Harbor protocol** proxies (minters, pools, pegged/leveraged tokens, genesis, fee receivers, etc.) from the canonical deployment state file. It does not include [HarborAggregator v3 oracle proxies](../contracts/price-oracles/mainnet.md) (those live under the price-oracle documentation and separate deployment metadata).

| Field | Value |
| ----- | ----- |
| **Source** | [`deployments/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) |
| **Manifest `version`** | `v1` |
| **Network** | `mainnet` (`chainId` **1**) |
| **`schemaVersion`** | `1` |
| **`saltPrefix`** | `harbor_v1` |
| **`baoFactory`** | `0xD696E56b3A054734d4C6DCBD32E11a278b0EC458` |
| **`lastUpdated`** | `2026-05-17T22:51:35Z` |

### Mainnet proxy table

| Proxy key | Proxy address | Implementation | CREATE3 salt (string) |
| --------- | ------------- | -------------- | --------------------- |
| `BTC::fxUSD::genesis` | `0x42cc9a19b358a2A918f891D8a6199d8b05F0BC1C` | `0xa3a03e0077feF127Bbd6638E8d3Cb3a371BeeAa1` | `harbor_v1::BTC::fxUSD::genesis` |
| `BTC::fxUSD::leveraged` | `0x9567c243F647f9Ac37efb7Fc26BD9551Dce0BE1B` | `0xAA6E345De9B9E86dFcDBE1f75a9e5b5610AfE773` | `harbor_v1::BTC::fxUSD::leveraged` |
| `BTC::fxUSD::minter` | `0x33e32ff4d0677862fa31582CC654a25b9b1e4888` | `0x118036f2d885B2EA27DF39705fEf34F88aFA9901` | `harbor_v1::BTC::fxUSD::minter` |
| `BTC::fxUSD::minterFeeReceiver` | `0x70DdA12032335656b63435840Cd55ff7A19dDAb7` | `0xeE8D6D850Be79A4Fb6f829FC9BB0d28Dfa8515Df` | `harbor_v1::BTC::fxUSD::minterFeeReceiver` |
| `BTC::fxUSD::reservePool` | `0xfDE46D4425138aA01319bB8587Cb935a0393DfE3` | `0x1cabe71747D3650F7D94A42Fcd89d92001c26E5F` | `harbor_v1::BTC::fxUSD::reservePool` |
| `BTC::fxUSD::stabilityPoolCollateral` | `0x86561cdB34ebe8B9abAbb0DD7bEA299fA8532a49` | `0xfA20ABE7F5b32Af6871414b7B71f780EcfDB1497` | `harbor_v1::BTC::fxUSD::stabilityPoolCollateral` |
| `BTC::fxUSD::stabilityPoolLeveraged` | `0x9e56F1E1E80EBf165A1dAa99F9787B41cD5bFE40` | `0xaFE9DF05bba2D93e78920860e4372Ef912b523C7` | `harbor_v1::BTC::fxUSD::stabilityPoolLeveraged` |
| `BTC::fxUSD::stabilityPoolManager` | `0x768E0a386e1972eB5995429Fe21E7aC0f22F516e` | `0x77C6665c67cbBB8cc1DB30213b5ab4449ef364F5` | `harbor_v1::BTC::fxUSD::stabilityPoolManager` |
| `BTC::fxUSD::stabilityPoolManagerFeeReceiver` | `0xbB44740D2FA2310888f491A9dB8B1474c741BD0f` | `0xca0a68F9C20d67C7931F91b64b89f4b22Af51cDf` | `harbor_v1::BTC::fxUSD::stabilityPoolManagerFeeReceiver` |
| `BTC::pegged` | `0x25bA4A826E1A1346dcA2Ab530831dbFF9C08bEA7` | `0x8d6B59B2D07C1e70BE2B167a4fD07807df133582` | `harbor_v1::BTC::pegged` |
| `BTC::stETH::genesis` | `0xc64Fc46eED431e92C1b5e24DC296b5985CE6Cc00` | `0x93E71d996C5ccD1554f1ddAE4977EA857abeb89C` | `harbor_v1::BTC::stETH::genesis` |
| `BTC::stETH::leveraged` | `0x817ADaE288eD46B8618AAEffE75ACD26A0a1b0FD` | `0xA580AF59522c9BA0Fca82Ae8D9Aaa10Fa212F0A1` | `harbor_v1::BTC::stETH::leveraged` |
| `BTC::stETH::minter` | `0xF42516EB885E737780EB864dd07cEc8628000919` | `0x00E03920CaCde8333B58410822a7d3bb9ADAD7e9` | `harbor_v1::BTC::stETH::minter` |
| `BTC::stETH::minterFeeReceiver` | `0xc3a97138a5aDCC7d28A1375E28EC3440aeaeDF3e` | `0x72c20fbB8EdC199ABaB9086C1B42958A185da255` | `harbor_v1::BTC::stETH::minterFeeReceiver` |
| `BTC::stETH::reservePool` | `0x515ECa19Ac381b0f37D616F99628136906fC5355` | `0xd904b61EBa087DfE7d984259B50324Cc1808c88F` | `harbor_v1::BTC::stETH::reservePool` |
| `BTC::stETH::stabilityPoolCollateral` | `0x667Ceb303193996697A5938cD6e17255EeAcef51` | `0x5AcEcff04Bb9e50630c96b083b367440CBdd9339` | `harbor_v1::BTC::stETH::stabilityPoolCollateral` |
| `BTC::stETH::stabilityPoolLeveraged` | `0xCB4F3e21DE158bf858Aa03E63e4cEc7342177013` | `0xfC9929eABc8264A989593A2f851eF74363cE888F` | `harbor_v1::BTC::stETH::stabilityPoolLeveraged` |
| `BTC::stETH::stabilityPoolManager` | `0x5e9Bcaa1EDfD665c09a9e6693B447581d61A85A1` | `0xF7aAF7D417cCabe0EB0aE36ff469311A5b6815da` | `harbor_v1::BTC::stETH::stabilityPoolManager` |
| `BTC::stETH::stabilityPoolManagerFeeReceiver` | `0x3fdd1D4E5f4DAAeC4650b212935832DaECF62B1c` | `0x2B7ac74a047a474e5B1D5219CAf462b0506a0c31` | `harbor_v1::BTC::stETH::stabilityPoolManagerFeeReceiver` |
| `ETH::fxUSD::genesis` | `0xC9df4f62474Cf6cdE6c064DB29416a9F4f27EBdC` | `0x96ED4c4a0D4a82ED649fb15A64C13472D9a28F93` | `harbor_v1::ETH::fxUSD::genesis` |
| `ETH::fxUSD::leveraged` | `0x0Cd6BB1a0cfD95e2779EDC6D17b664B481f2EB4C` | `0xEA6555386f7E13D18Ec7c22097eAFa4D80F8bB34` | `harbor_v1::ETH::fxUSD::leveraged` |
| `ETH::fxUSD::minter` | `0xd6E2F8e57b4aFB51C6fA4cbC012e1cE6aEad989F` | `0xd0b640Ff304E7a09d350DbC65142Be316105C189` | `harbor_v1::ETH::fxUSD::minter` |
| `ETH::fxUSD::minterFeeReceiver` | `0xdC903fe5ebCE440f22578D701b95424363D20881` | `0xEC0646d6a08A4409908DA1fABc26969AE135EA97` | `harbor_v1::ETH::fxUSD::minterFeeReceiver` |
| `ETH::fxUSD::reservePool` | `0x7A5c4ca972CE2168d5215d252946dDbd1cAd2015` | `0x4816D539cCDE3326A6Ecc8Df1e59570399285223` | `harbor_v1::ETH::fxUSD::reservePool` |
| `ETH::fxUSD::stabilityPoolCollateral` | `0x1F985CF7C10A81DE1940da581208D2855D263D72` | `0x7e2348c9FBf9008483fF61182095d3DE65b3e0b9` | `harbor_v1::ETH::fxUSD::stabilityPoolCollateral` |
| `ETH::fxUSD::stabilityPoolLeveraged` | `0x438B29EC7a1770dDbA37D792F1A6e76231Ef8E06` | `0x6C0D48839A0B1c9D79dDD4Ad3f407709E0f44be1` | `harbor_v1::ETH::fxUSD::stabilityPoolLeveraged` |
| `ETH::fxUSD::stabilityPoolManager` | `0xE39165aDE355988EFb24dA4f2403971101134CAB` | `0x9C6a6B61b1ac3A344584c3747597964c0DD65C7D` | `harbor_v1::ETH::fxUSD::stabilityPoolManager` |
| `ETH::fxUSD::stabilityPoolManagerFeeReceiver` | `0x9e92965Afb51ce80aa451F93530880f469C2B282` | `0xe32bF3a9d68119094d5E388eA5AF226e6d57Cc91` | `harbor_v1::ETH::fxUSD::stabilityPoolManagerFeeReceiver` |
| `ETH::pegged` | `0x7A53EBc85453DD006824084c4f4bE758FcF8a5B5` | `0x4cD716A3DEe21eCB76B485F4374318507FeC1B75` | `harbor_v1::ETH::pegged` |
| `EUR::fxUSD::genesis` | `0xa9EB43Ed6Ba3B953a82741F3e226C1d6B029699b` | `0x6d43EE4F28E6f25871B34a16cAC500DA54132B30` | `harbor_v1::EUR::fxUSD::genesis` |
| `EUR::fxUSD::leveraged` | `0x7A7C1f2502c19193C44662A2Aff51c2B76fDDAEA` | `0xe86c568aDEd105d7A63fe63e2C12Dfa567cBf2e3` | `harbor_v1::EUR::fxUSD::leveraged` |
| `EUR::fxUSD::minter` | `0xDEFB2C04062350678965CBF38A216Cc50723B246` | `0x05d429A852b04Bb0bb27A19CAD1b42548a21c71B` | `harbor_v1::EUR::fxUSD::minter` |
| `EUR::fxUSD::minterFeeReceiver` | `0x43dfDB5059777A8B8819d8D8ff2c9ACCFEb766CB` | `0x07F9194fE7c847472Ef6D984DdE0D447fd4b76B1` | `harbor_v1::EUR::fxUSD::minterFeeReceiver` |
| `EUR::fxUSD::reservePool` | `0x27cA37538358F90d45cAA886fB58CC08ffe2dD2f` | `0xDfFb26e9f81Cbc8B9b88c2e2DDeEe770fe765EFd` | `harbor_v1::EUR::fxUSD::reservePool` |
| `EUR::fxUSD::stabilityPoolCollateral` | `0xe60054E6b518f67411834282cE1557381f050B13` | `0x509a33f3594E7dAb8ad8252915d562D01f9557f4` | `harbor_v1::EUR::fxUSD::stabilityPoolCollateral` |
| `EUR::fxUSD::stabilityPoolLeveraged` | `0xc5e0dA7e0a178850438E5E97ed59b6eb2562e88E` | `0x85c911b1249f02947a7D66271089797788f967bC` | `harbor_v1::EUR::fxUSD::stabilityPoolLeveraged` |
| `EUR::fxUSD::stabilityPoolManager` | `0x756766756880ceA06270Fd507b09Ef32714Ec7C2` | `0xF625E8147C07DDF5a488FCB5C95c91ACef46E22E` | `harbor_v1::EUR::fxUSD::stabilityPoolManager` |
| `EUR::fxUSD::stabilityPoolManagerFeeReceiver` | `0xd2a815B2210c15E1626CD0D487C77852E7C37b17` | `0xC266C83e5474756eA904987D63450b2E0CF6c0C1` | `harbor_v1::EUR::fxUSD::stabilityPoolManagerFeeReceiver` |
| `EUR::pegged` | `0x83Fd69E0FF5767972b46E61C6833408361bF7346` | `0xe88A00298279D55718FB5E9d8009C1040c5905f7` | `harbor_v1::EUR::pegged` |
| `EUR::stETH::genesis` | `0xf4F97218a00213a57A32E4606aAecC99e1805A89` | `0x22F6162b40268991FFbc97e0ae9d0d8D2Fee0ad7` | `harbor_v1::EUR::stETH::genesis` |
| `EUR::stETH::leveraged` | `0xEA23FaAf5e464488ECc29883760238B68410D92b` | `0x49507E8f786B0a6F1E69E2e4bAfB6C172Eae6733` | `harbor_v1::EUR::stETH::leveraged` |
| `EUR::stETH::minter` | `0x68911ea33E11bc77e07f6dA4db6cd23d723641cE` | `0xa6322b1c33E7905C1B855B5538343d8B84E327A9` | `harbor_v1::EUR::stETH::minter` |
| `EUR::stETH::reservePool` | `0xdfE995CdAa4D956C0673428cA999782239b0C03D` | `0x47D3F67eFD8A7d85b73D7450103109eFFf8D88C2` | `harbor_v1::EUR::stETH::reservePool` |
| `EUR::stETH::stabilityPoolCollateral` | `0x000564B33FFde65E6c3b718166856654e039D69B` | `0x84ce6c641FE73711fc20442ea3D7f618471C88e0` | `harbor_v1::EUR::stETH::stabilityPoolCollateral` |
| `EUR::stETH::stabilityPoolLeveraged` | `0x7553fb328ef35aF1c2ac4E91e53d6a6B62DFDdEa` | `0x971505844766137Ed2bee2833D16A2F9d3ed7161` | `harbor_v1::EUR::stETH::stabilityPoolLeveraged` |
| `EUR::stETH::stabilityPoolManager` | `0x29AAEe8b76A5970D7d5041F500512e2b9d70Aa94` | `0x64920f948B09f7384D36f298C5d613d44AE8b77d` | `harbor_v1::EUR::stETH::stabilityPoolManager` |
| `GOLD::fxUSD::genesis` | `0x2cbF457112Ef5A16cfcA10Fb173d56a5cc9DAa66` | `0xe08d21418ED9078fE0292602DAD28BA9347312EA` | `harbor_v1::GOLD::fxUSD::genesis` |
| `GOLD::fxUSD::leveraged` | `0x85730Af3A7d7A872Ee1D84306E0575f1E00C0980` | `0xaCA783ba4D58b78371D0b5822E81Eeb42194DF2c` | `harbor_v1::GOLD::fxUSD::leveraged` |
| `GOLD::fxUSD::minter` | `0x880600E0c803d836E305B7c242FC095Eed234A8f` | `0x7Bcc5f7328892ff1Beef6B80E281884E5542e02E` | `harbor_v1::GOLD::fxUSD::minter` |
| `GOLD::fxUSD::minterFeeReceiver` | `0x8C5EF0342543A509e5548c71A66dE7D8A69c6B70` | `0x99f3CAC5F7a3c91134Dccd523560F553BA286E1b` | `harbor_v1::GOLD::fxUSD::minterFeeReceiver` |
| `GOLD::fxUSD::reservePool` | `0xc033e81ED555D6db63A3E0Af9795454C7BdF094a` | `0x4b5996034C1B888ac70bB4C5687E6faF5DddFeF8` | `harbor_v1::GOLD::fxUSD::reservePool` |
| `GOLD::fxUSD::stabilityPoolCollateral` | `0xC1EF32d4B959F2200efDeDdedadA226461d14DaC` | `0x9016897e4ffDD345BAfc407c762A3c7A00ba2Eff` | `harbor_v1::GOLD::fxUSD::stabilityPoolCollateral` |
| `GOLD::fxUSD::stabilityPoolLeveraged` | `0x5bDED171f1c08B903b466593B0E022F9FdE8399c` | `0x608447859007967e950D9FdB931F05279DE539e7` | `harbor_v1::GOLD::fxUSD::stabilityPoolLeveraged` |
| `GOLD::fxUSD::stabilityPoolManager` | `0x5b69069CC4012a96342B0FeCC28aD15bDE6447B5` | `0x5c96077BB55376b66670B937F7bBdDBBc63A8564` | `harbor_v1::GOLD::fxUSD::stabilityPoolManager` |
| `GOLD::fxUSD::stabilityPoolManagerFeeReceiver` | `0x360838316494E355CE7a58c2990606F30F21e8A1` | `0xa5c42eC86DD26603a3cd48Cf95abDAc7E1D14B70` | `harbor_v1::GOLD::fxUSD::stabilityPoolManagerFeeReceiver` |
| `GOLD::pegged` | `0x5b66D86932aE5D9751da588d91D494950554061d` | `0x28eB6581253Ae4F9215b01F7e723Bd465fa46e2b` | `harbor_v1::GOLD::pegged` |
| `GOLD::stETH::genesis` | `0x8Ad6b177137A6c33070c27d98355717849Ce526c` | `0xfbd09d8979F65Be88970Ac2512Cdfe6Fbb2e0105` | `harbor_v1::GOLD::stETH::genesis` |
| `GOLD::stETH::leveraged` | `0x94460C6477cdA339DA0e7E39f6Aa66EF047e2F6a` | `0x19400A8Cf62B794Bc74356cA24a30cCc1006Cb6F` | `harbor_v1::GOLD::stETH::leveraged` |
| `GOLD::stETH::minter` | `0xB315DC4698DF45A477d8bb4B0Bc694C4D1Be91b5` | `0xAD84bD793De34298FaEeCFF18b8DDca426036b54` | `harbor_v1::GOLD::stETH::minter` |
| `GOLD::stETH::reservePool` | `0x8224E5264FdD99547a21fFf34bDB60e78faB1609` | `0x39B4cC40BCF01513Da9B5a23d904197429D1eb2E` | `harbor_v1::GOLD::stETH::reservePool` |
| `GOLD::stETH::stabilityPoolCollateral` | `0x215C28DcCe0041eF9a17277CA271F100d9F345CF` | `0x3CE39338f09Cc94EA8346ebe9267929E74da821F` | `harbor_v1::GOLD::stETH::stabilityPoolCollateral` |
| `GOLD::stETH::stabilityPoolLeveraged` | `0x2af96e906D568c92E53e96bB2878ce35E05dE69a` | `0x8a2f8815463EA064Db1056D22d3a931793E8d5Aa` | `harbor_v1::GOLD::stETH::stabilityPoolLeveraged` |
| `GOLD::stETH::stabilityPoolManager` | `0x322b19DFBeF5F41d1FA6436886349EEE02408867` | `0x2FaBe53693B3f0b084C3b1001563f04f06F92340` | `harbor_v1::GOLD::stETH::stabilityPoolManager` |
| `MCAP::fxUSD::genesis` | `0x7Bfb831E6360D4600C7b9b200F8AcA6f89CecdA4` | `0xA244FC2885Ac0bC93286d7C13e5F1e5bc714baD3` | `harbor_v1::MCAP::fxUSD::genesis` |
| `MCAP::fxUSD::leveraged` | `0x410cA79c92665E7f502Cbc59e4f6edfCb97F5ddd` | `0x8e56A7c8047D5E995386875B9E23cFfEa56169d8` | `harbor_v1::MCAP::fxUSD::leveraged` |
| `MCAP::fxUSD::minter` | `0x3d3EAe3a4Ee52ef703216c62EFEC3157694606dE` | `0x2010F81E9A27a6768dea33523bfeaDbBC0F46345` | `harbor_v1::MCAP::fxUSD::minter` |
| `MCAP::fxUSD::reservePool` | `0xBC645796937B0883dAE66CE3f8211891Cbc0324C` | `0x8B554b9A6E7b508549e8F1F1883646fB2e1B997A` | `harbor_v1::MCAP::fxUSD::reservePool` |
| `MCAP::fxUSD::stabilityPoolCollateral` | `0x7928a145Eed1374f5594c799290419B80fCd03f0` | `0x9AED2267655aDA9C514454e93019201282B309e0` | `harbor_v1::MCAP::fxUSD::stabilityPoolCollateral` |
| `MCAP::fxUSD::stabilityPoolLeveraged` | `0x8CF0C5F1394E137389D6dbfE91c56D00dEcdDAD8` | `0x95fbaEc01aE1646F7BD4C7ceFdF08328d4b848AE` | `harbor_v1::MCAP::fxUSD::stabilityPoolLeveraged` |
| `MCAP::fxUSD::stabilityPoolManager` | `0x52DC69cbdC6Ef508b7419A456dD36967DAEfD538` | `0x6565718F0C203B4Dc59F51090472bDDD0fD54f80` | `harbor_v1::MCAP::fxUSD::stabilityPoolManager` |
| `MCAP::pegged` | `0x0C5CC55959DBDE5d9fa05064da754D6A298E9833` | `0x5C7606b5De7c130982b9841D9b4B9C107d394bC7` | `harbor_v1::MCAP::pegged` |
| `MCAP::stETH::genesis` | `0xa6c02dE8E3150C6ffA9C80F98185d42653CB438d` | `0xBcc3C0e0c19bb8b6CaE6fd79e85EfBAF8025C5D6` | `harbor_v1::MCAP::stETH::genesis` |
| `MCAP::stETH::leveraged` | `0x4dc51cAa3551a9D01eebaA801c63b59A64028745` | `0x1A22baAa37467cd6c43C363Da43Efef0AcD17a06` | `harbor_v1::MCAP::stETH::leveraged` |
| `MCAP::stETH::minter` | `0xe37e34Ab0AaaabAc0e20c911349c1dEfAD0691B6` | `0x8E5e4726De2E0D881080242Aac491d86889853c0` | `harbor_v1::MCAP::stETH::minter` |
| `MCAP::stETH::reservePool` | `0x9B7fFA713d504F4DdC4f54c6dF6b1a9971d8B728` | `0xe9d82C1e79D8FA54675689C224B885B524075f84` | `harbor_v1::MCAP::stETH::reservePool` |
| `MCAP::stETH::stabilityPoolCollateral` | `0x4cFf4948A0EA73Ee109327b56da0bead8c323189` | `0xA72FC7dd6DEB1c039C71E79A1eDa9e640f9f2d6f` | `harbor_v1::MCAP::stETH::stabilityPoolCollateral` |
| `MCAP::stETH::stabilityPoolLeveraged` | `0x505bfC99D2FB1A1424b2A4AA81303346df4f27E9` | `0x9002104eBA42Af428DF0Be8EdbE53be6F1b27D41` | `harbor_v1::MCAP::stETH::stabilityPoolLeveraged` |
| `MCAP::stETH::stabilityPoolManager` | `0x1298ab1957ee023E228d57bE2db73494b649E52F` | `0x1F35232B40eeed56f7CD57c29f2d3F91000B6d64` | `harbor_v1::MCAP::stETH::stabilityPoolManager` |
| `SILVER::fxUSD::genesis` | `0x66d18B9Dd5d1cd51957DFea0e0373b54E06118C8` | `0xB1c6064DB8B2412332dd6F51a83868306378E255` | `harbor_v1::SILVER::fxUSD::genesis` |
| `SILVER::fxUSD::leveraged` | `0x74692d22a0CB924e4299785cc299291e560dF9cf` | `0x851991FC60bd768A78F2F6621Ef0BF3f181096d6` | `harbor_v1::SILVER::fxUSD::leveraged` |
| `SILVER::fxUSD::minter` | `0x177bb50574CDA129BDd0B0F50d4E061d38AA75Ef` | `0xb6c6c5b3f99b2FFE6406405cF81bF85e4E44141c` | `harbor_v1::SILVER::fxUSD::minter` |
| `SILVER::fxUSD::reservePool` | `0xDBF9F31795DAEa636e3e1305f897BFa8D2aA017d` | `0x84e73F12157970fcfB146d536e44c050479D72b9` | `harbor_v1::SILVER::fxUSD::reservePool` |
| `SILVER::fxUSD::stabilityPoolCollateral` | `0x7619664fe05c9cbDA5B622455856D7CA11Cb8800` | `0x20544A0776BC1bCA289B00EE693CF80F9a5B6198` | `harbor_v1::SILVER::fxUSD::stabilityPoolCollateral` |
| `SILVER::fxUSD::stabilityPoolLeveraged` | `0x24AEf2d27146497B18df180791424b1010bf1889` | `0xA10A027d163A7A2C849aF202e242705206983c03` | `harbor_v1::SILVER::fxUSD::stabilityPoolLeveraged` |
| `SILVER::fxUSD::stabilityPoolManager` | `0x1EF76C3f4B426dFeC271a8a3904035dE0A6E6d75` | `0xe6937cBc92d017ac11762946F163a0208A4a4e56` | `harbor_v1::SILVER::fxUSD::stabilityPoolManager` |
| `SILVER::pegged` | `0x7dE413B0Abee6f685a8ff7fB53330E3C56523e74` | `0xa77E5c895492C8521B045fC3E46B8ec9eBdA6F72` | `harbor_v1::SILVER::pegged` |
| `SILVER::stETH::genesis` | `0x8f655Ca32A1Fa8032955989c19e91886F26439dc` | `0x484af81c354c5184FC22F26D76F1da5b6181BE8E` | `harbor_v1::SILVER::stETH::genesis` |
| `SILVER::stETH::leveraged` | `0x5BB5672be4553E648c1D20F093826faf77386d34` | `0xE8B0e0bCAf26737e2A6b5491cFbe77557bb8c10B` | `harbor_v1::SILVER::stETH::leveraged` |
| `SILVER::stETH::minter` | `0x1c0067BEe039A293804b8BE951B368D2Ec65b3e9` | `0x5fbE14DF50a7E6D15BCbC938d06341f8602C6eDa` | `harbor_v1::SILVER::stETH::minter` |
| `SILVER::stETH::reservePool` | `0x77AC9343621402B938d5A39727Da76891aFFA419` | `0x15033f53CF5188aB6814c1A6E840cdC20f40Ca80` | `harbor_v1::SILVER::stETH::reservePool` |
| `SILVER::stETH::stabilityPoolCollateral` | `0x1C9c1cF9aa9fc86dF980086CbC5a5607522cFc3E` | `0x15cfE62D2C50Ea94a38dDd93D4a79C626d391638` | `harbor_v1::SILVER::stETH::stabilityPoolCollateral` |
| `SILVER::stETH::stabilityPoolLeveraged` | `0x4C0F988b3c0C58F5ea323238E9d62B79582738e6` | `0x882698a4F0284e1DfBc2Ef7C55297bDd48a12eeb` | `harbor_v1::SILVER::stETH::stabilityPoolLeveraged` |
| `SILVER::stETH::stabilityPoolManager` | `0xbA6b54ED8D76bD4f6B4efD4f1f2344B2Ec386c3E` | `0x13D7Bb5D7f48a7E49082203566a8bC1ba44dCA0a` | `harbor_v1::SILVER::stETH::stabilityPoolManager` |
| `USD::PAXG::genesis` | `0x68edA29187587DEf950d566f862FFA85FdA594cf` | `0x5baF5296A5D0D418619FdBb9b39feBa821E3dC60` | `harbor_v1::USD::PAXG::genesis` |
| `USD::PAXG::leveraged` | `0xba7d5212B74CBB6A8EC3418a1F7C2B360f8aF144` | `0xA3E0f95f99825761c0a07084fBA99A257806579b` | `harbor_v1::USD::PAXG::leveraged` |
| `USD::PAXG::minter` | `0x7E1D48774F6faD0Aa41cbb47A66BB8Ec3094e3c2` | `0x44bA8Ce0A747332dC53654E54a5F50B43A421364` | `harbor_v1::USD::PAXG::minter` |
| `USD::PAXG::reservePool` | `0x4C60a87BC13Aa44Fa16b657868FA8a0cDA5DCC52` | `0x90C344BF356727bd0D545fD8343597f99199beAb` | `harbor_v1::USD::PAXG::reservePool` |
| `USD::PAXG::stabilityPoolCollateral` | `0xAf7B276dF93F74AE7780E1D5f550bEaf4Ff26415` | `0x8499eefFcec687DA4121390b8e02700B5cE07a35` | `harbor_v1::USD::PAXG::stabilityPoolCollateral` |
| `USD::PAXG::stabilityPoolLeveraged` | `0x45B3e0dC9DdaDE6D5e2D45AD08c28B794Bdbf985` | `0xF2747AC14713Ae33E555782E6Dd584541d73Cb3a` | `harbor_v1::USD::PAXG::stabilityPoolLeveraged` |
| `USD::PAXG::stabilityPoolManager` | `0xf0ab0C95E5cb0C36780D09d4DED29AF869E65f86` | `0xc079856695816018ffeD3C22D7a8004C19c9b0E4` | `harbor_v1::USD::PAXG::stabilityPoolManager` |
| `USD::pegged` | `0x2536A8636A99466173229AB15fdb37Fcaa05BA1A` | `0x8CEf5c15792f587d79aC07A720e2CDce9777391a` | `harbor_v1::USD::pegged` |
| `USD::stETH::genesis` | `0x40ff767FF4055D53b1BC1B0141221a37B25905fD` | `0xDe80bbFa51f89740382E1ff95570c3d70A011d88` | `harbor_v1::USD::stETH::genesis` |
| `USD::stETH::leveraged` | `0xf9B67dE4346458cD9cB18AfA884b25c869A9161B` | `0x536Dd90010160D0888368bbAFB17C4Af6c60E2F2` | `harbor_v1::USD::stETH::leveraged` |
| `USD::stETH::minter` | `0xC14837C30BEdF3081cBa2cDeB067fA6F0381e69b` | `0x409cFFcFd766083DbACa9e51Dd51C57a9515c1C0` | `harbor_v1::USD::stETH::minter` |
| `USD::stETH::reservePool` | `0x8EBcE958BAAa46163D32b57b07a36DaA1E36CA8d` | `0xcb744382e3EE81ea049901C57c3bEBE8a39af7Aa` | `harbor_v1::USD::stETH::reservePool` |
| `USD::stETH::stabilityPoolCollateral` | `0xD21613339E8A6adba7a084f67802731e6045d801` | `0x39042dD72D717fbeFD10e55Bc9AB217f402dFB7f` | `harbor_v1::USD::stETH::stabilityPoolCollateral` |
| `USD::stETH::stabilityPoolLeveraged` | `0x6E7b445e4dac4787445f31382f4E3dCAd510c238` | `0x13CE9b0132d2A1Ee50A2f6b17b375e113035272A` | `harbor_v1::USD::stETH::stabilityPoolLeveraged` |
| `USD::stETH::stabilityPoolManager` | `0x377a4A6BEC4C75F2B7054B67Df03ce9A7497c33d` | `0x57D52A5EF544D51BfdDBcA6697697E03dAb40778` | `harbor_v1::USD::stETH::stabilityPoolManager` |
| `USD::tBTC::genesis` | `0x64E72Cbb24D1f80A0f66778dA0b95A46ead30539` | `0x6E9F8D824FC639FE015A7E6A91ffa21b4Dbf4C9D` | `harbor_v1::USD::tBTC::genesis` |
| `USD::tBTC::leveraged` | `0x0348b423C1Fd6d426609b7dCA560398CC3e4eA1B` | `0x344bFd4A5598b1CA88927164038619746af49714` | `harbor_v1::USD::tBTC::leveraged` |
| `USD::tBTC::minter` | `0x1E326fFF476a5d107f1f6684380f677d2fd5E492` | `0xEdc14aBe1E482121547934933d25DeA8d9C52b8B` | `harbor_v1::USD::tBTC::minter` |
| `USD::tBTC::reservePool` | `0xaF52B331D523dc7eF0A1145638048D218456EBd1` | `0x13d52Da73dd40E0A41A58822489BAD7D61CB25D6` | `harbor_v1::USD::tBTC::reservePool` |
| `USD::tBTC::stabilityPoolCollateral` | `0x9a229b4ec6A0D2154689De8EDa9d14C884DE707b` | `0xcF51472fE4DC2d000b86EB70cfBFce2589c37106` | `harbor_v1::USD::tBTC::stabilityPoolCollateral` |
| `USD::tBTC::stabilityPoolLeveraged` | `0x6a059A79bD261e2bFD160CAc4733108a8BDa2BD6` | `0x1996857Cf26d846a777Dc6244B2BE1907aF00068` | `harbor_v1::USD::tBTC::stabilityPoolLeveraged` |
| `USD::tBTC::stabilityPoolManager` | `0xD9Bc7F5B90BBf7fCCeC24c67905A6205627D8674` | `0x6cB9212EAAf474aB099ba4A456D66adb7481B02d` | `harbor_v1::USD::tBTC::stabilityPoolManager` |
| `USD::wBTC::genesis` | `0xbaE2Cab2Ed87D488CF264bA9411A3fDDAB43ec22` | `0x3BC2016150d1B0017f778cDB63280E9A3245Bd7E` | `harbor_v1::USD::wBTC::genesis` |
| `USD::wBTC::leveraged` | `0xC5492515fAcfEe2d0C8B475FF3b57B3b79497456` | `0x40ad593f4F363D20d6697c30657f5895b76dcB73` | `harbor_v1::USD::wBTC::leveraged` |
| `USD::wBTC::minter` | `0x0aA2b6Ee6D079f39A52725B33B15854505542B51` | `0x89426597AC36aBbaDa8eb8729262d4E03C0e2d3E` | `harbor_v1::USD::wBTC::minter` |
| `USD::wBTC::reservePool` | `0x81f15ff2deAd8F3D97e84849072b8550facCd5ee` | `0xF5103951a567C2414E53B1E65775a2B5C260E014` | `harbor_v1::USD::wBTC::reservePool` |
| `USD::wBTC::stabilityPoolCollateral` | `0xa1959F3dae8C3e7c8825dD7902D30569aF092Ed8` | `0x3F32085F619ea5817C4Cb864C44050108FAd37f9` | `harbor_v1::USD::wBTC::stabilityPoolCollateral` |
| `USD::wBTC::stabilityPoolLeveraged` | `0xd16C291456060bF36023D9a935719380a14dE3AD` | `0x547d8F6B4F85555B50f8Fa7f00Fa65dc67997a2a` | `harbor_v1::USD::wBTC::stabilityPoolLeveraged` |
| `USD::wBTC::stabilityPoolManager` | `0x2506223d01072f795487Ff1f67aD40E1D3B15De0` | `0xE296C401C9522f7a194fb66a4DFb499Fc0d629d9` | `harbor_v1::USD::wBTC::stabilityPoolManager` |

Mainnet USD stacks (shared `USD::pegged` / haUSD): [stETH/USD](./hausd/steth.md), [PAXG/USD](./hausd/paxg.md), [wBTC/USD](./hausd/wbtc.md), [tBTC/USD](./hausd/tbtc.md).

## MegaETH Harbor deployment proxies

**MegaETH markets are not the same deployment family as Ethereum mainnet Harbor v1 markets** documented above: different `chainId` and `saltPrefix`. Mainnet also has `USD::*` proxies (shared haUSD under `harbor_v1`); MegaETH `USD::stETH::*` uses `harbor_megaeth_v1` and different addresses. Human-readable market names still use **collateral first, then peg** (e.g. stETH/USD).

| | Ethereum mainnet (above) | MegaETH (below) |
| --- | --- | --- |
| **`chainId`** | `1` | `4326` |
| **`saltPrefix`** | `harbor_v1` | `harbor_megaeth_v1` |
| **Example minter proxy key** | `USD::stETH::minter` (also `ETH::fxUSD::minter`, …) | `USD::stETH::minter` |
| **Example CREATE3 salt** | `harbor_v1::USD::stETH::minter` | `harbor_megaeth_v1::USD::stETH::minter` |
| **Canonical state file** | [`…/mainnet/harbor_v1.state.json`](https://github.com/baofinance/harbor/blob/main/deployments/mainnet/harbor_v1.state.json) | Committed MegaETH manifest TBD under [`deployments`](https://github.com/baofinance/harbor/tree/main/deployments); table below is the documented snapshot |

The following registry matches the Harbor deployment manifest structure (`schemaVersion` 1, `version` v1).

| Field | Value |
| ----- | ----- |
| **`schemaVersion`** | `1` |
| **Manifest `version`** | `v1` |
| **`saltPrefix`** | `harbor_megaeth_v1` |
| **Network** | `megaeth` (`chainId` **4326**) |
| **`baoFactory`** | `0xD696E56b3A054734d4C6DCBD32E11a278b0EC458` |
| **`lastUpdated`** | `2026-04-29T21:50:12Z` |

### Implementations (implementation address metadata)

| Implementation | Proxy key | `contractSource` | `contractType` | `deploymentTime` |
| ---------------- | --------- | ---------------- | -------------- | ---------------- |
| `0x50eA38B09612B508ECBeb432cb9Bf9ae91362908` | `USD::pegged` | `@bao/MintableBurnableERC20_v1.sol` | `MintableBurnableERC20_v1` | `2026-04-29T21:50:12Z` |
| `0x6774745AfC1574Cda36D7cc2D53Df0028480790e` | `USD::stETH::genesis` | `@harbor/minter/Genesis_v1.sol` | `Genesis_v1` | `2026-04-29T21:50:12Z` |
| `0x2fa33C10A5833c1a983d6a373128C736d5eE9a11` | `USD::stETH::leveraged` | `@bao/MintableBurnableERC20_v1.sol` | `MintableBurnableERC20_v1` | `2026-04-29T21:50:12Z` |
| `0x2A9bd9829B690Ee36B79f735412E0959F7813534` | `USD::stETH::minter` | `@harbor/minter/Minter_v2.sol` | `Minter_v2` | `2026-04-29T21:50:12Z` |
| `0xa3287C1A9A777426bC3022d2a94AfDA9561bda3a` | `USD::stETH::reservePool` | `@harbor/minter/ReservePool_v1.sol` | `ReservePool_v1` | `2026-04-29T21:50:12Z` |
| `0x1b46529C3b3E708215C5C7D3BCf5d70443f98588` | `USD::stETH::stabilityPoolCollateral` | `@harbor/minter/StabilityPool_v2.sol` | `StabilityPool_v2` | `2026-04-29T21:50:12Z` |
| `0xaa47742C019357c7DD85917A4126676265D12EBE` | `USD::stETH::stabilityPoolLeveraged` | `@harbor/minter/StabilityPool_v2.sol` | `StabilityPool_v2` | `2026-04-29T21:50:12Z` |
| `0xCE23e54B1b47277f2B5F1deff06908e95E0Bf38C` | `USD::stETH::stabilityPoolManager` | `@harbor/minter/StabilityPoolManager_v1.sol` | `StabilityPoolManager_v1` | `2026-04-29T21:50:12Z` |

### MegaETH proxy table (CREATE3 salts)

| Proxy key | Proxy address | Implementation | CREATE3 salt (string) | `deploymentTime` |
| --------- | ------------- | -------------- | --------------------- | ---------------- |
| `USD::pegged` | `0xbEd2c24Cf10d7aC58350364aF8d3AbC0ce0D626f` | `0x50eA38B09612B508ECBeb432cb9Bf9ae91362908` | `harbor_megaeth_v1::USD::pegged` | `2026-04-29T21:49:49Z` |
| `USD::stETH::genesis` | `0x004C7091051bBD43dd1C26e3E37C85F869a987e7` | `0x6774745AfC1574Cda36D7cc2D53Df0028480790e` | `harbor_megaeth_v1::USD::stETH::genesis` | `2026-04-29T21:49:49Z` |
| `USD::stETH::leveraged` | `0x6c8Bf305a6F8C4613265DB876c8A1c3fCdd0d1F1` | `0x2fa33C10A5833c1a983d6a373128C736d5eE9a11` | `harbor_megaeth_v1::USD::stETH::leveraged` | `2026-04-29T21:49:49Z` |
| `USD::stETH::minter` | `0x77aD4a052812f1EeD89Fb4ED309e81c815D8d755` | `0x2A9bd9829B690Ee36B79f735412E0959F7813534` | `harbor_megaeth_v1::USD::stETH::minter` | `2026-04-29T21:49:49Z` |
| `USD::stETH::reservePool` | `0x0d60a96678066f3f9dCD1227481E7c1B5e2cbD96` | `0xa3287C1A9A777426bC3022d2a94AfDA9561bda3a` | `harbor_megaeth_v1::USD::stETH::reservePool` | `2026-04-29T21:49:49Z` |
| `USD::stETH::stabilityPoolCollateral` | `0xe4C4C226A2a267172C09efD43f9Db92B875FdA72` | `0x1b46529C3b3E708215C5C7D3BCf5d70443f98588` | `harbor_megaeth_v1::USD::stETH::stabilityPoolCollateral` | `2026-04-29T21:49:49Z` |
| `USD::stETH::stabilityPoolLeveraged` | `0x981D002e7A14E9f37f5feC17caa0B69f7A722132` | `0xaa47742C019357c7DD85917A4126676265D12EBE` | `harbor_megaeth_v1::USD::stETH::stabilityPoolLeveraged` | `2026-04-29T21:49:49Z` |
| `USD::stETH::stabilityPoolManager` | `0xfc45f502B0C04fF8dE7cca1703440D87De4B5dE7` | `0xCE23e54B1b47277f2B5F1deff06908e95E0Bf38C` | `harbor_megaeth_v1::USD::stETH::stabilityPoolManager` | `2026-04-29T21:49:49Z` |
| `stETH::USD::wrappedPriceAggregator` | `0xEDd3dC3E699360846c87CB69052EcbC900201854` | `0xDe10BEd5236B786cAA18Ca39FFa5de1b904a8a94` | `harbor_megaeth_v1::stETH::USD::wrappedPriceAggregator` | `2026-04-27T21:50:24Z` |

Per-market narrative and context: [stETH/USD (MegaETH)](./hausd-megaeth/steth.md). Other MegaETH feeds and deprecated pairs: [MegaETH price oracles](../contracts/price-oracles/megaeth.md).
