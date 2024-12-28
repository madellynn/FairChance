import { ethers } from "hardhat";
import { expect } from "chai";

describe("FairChanceLottery", function () {
  it("should allow players to buy tickets and select a winner", async function () {
    const [manager, player1, player2] = await ethers.getSigners();
    const FairChanceLottery = await ethers.getContractFactory(
      "FairChanceLottery"
    );
    const lottery = await FairChanceLottery.deploy(
      3600, // Duration of 1 hour
      ethers.utils.parseEther("0.01"), // Ticket price: 0.01 ETH
      "<VRF_COORDINATOR_ADDRESS>",
      "<LINK_TOKEN_ADDRESS>",
      "<KEY_HASH>",
      ethers.utils.parseEther("0.1") // LINK fee for VRF
    );

    await lottery.deployed();

    // Player1 buys a ticket
    await lottery
      .connect(player1)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    // Player2 buys a ticket
    await lottery
      .connect(player2)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    // Verify the participants
    const participants = await lottery.getParticipants();
    expect(participants).to.include(player1.address);
    expect(participants).to.include(player2.address);

    // Select winner (manager only)
    await lottery.connect(manager).selectWinner();

    // Check that a winner is selected
    const winner = await lottery.recentWinner();
    expect(winner).to.be.oneOf([player1.address, player2.address]);
  });

  it("should refund players if no winner is selected", async function () {
    const [manager, player1, player2] = await ethers.getSigners();
    const FairChanceLottery = await ethers.getContractFactory(
      "FairChanceLottery"
    );
    const lottery = await FairChanceLottery.deploy(
      1, // Short duration for testing
      ethers.utils.parseEther("0.01"),
      "<VRF_COORDINATOR_ADDRESS>",
      "<LINK_TOKEN_ADDRESS>",
      "<KEY_HASH>",
      ethers.utils.parseEther("0.1")
    );

    await lottery.deployed();

    // Player1 and Player2 buy tickets
    await lottery
      .connect(player1)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    await lottery
      .connect(player2)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    // Wait for lottery to end
    await ethers.provider.send("evm_increaseTime", [2]); // Increase time
    await ethers.provider.send("evm_mine", []); // Mine a block

    // Refund players (manager only)
    await lottery.connect(manager).refundPlayers();

    // Verify the refund
    const participants = await lottery.getParticipants();
    expect(participants).to.be.empty;
    expect(await ethers.provider.getBalance(lottery.address)).to.equal(0);
  });
});
