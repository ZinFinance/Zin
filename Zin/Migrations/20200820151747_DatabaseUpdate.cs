using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Zin.Migrations
{
    public partial class DatabaseUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BonusZinTokens",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PresaleZinTokens",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReferralCode",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReferralZinTokens",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZinTokens",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BonusRate",
                columns: table => new
                {
                    BonusRateId = table.Column<string>(nullable: false),
                    BonusType = table.Column<int>(nullable: false),
                    CreationDate = table.Column<DateTimeOffset>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    BonusPercentage = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusRate", x => x.BonusRateId);
                });

            migrationBuilder.CreateTable(
                name: "BonusTx",
                columns: table => new
                {
                    InternalId = table.Column<string>(nullable: false),
                    TxId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    ReferralCode = table.Column<string>(nullable: true),
                    AmountTransferredInEther = table.Column<string>(nullable: true),
                    AmountTransferredInToken = table.Column<string>(nullable: true),
                    EtherToUsdRateAtThatTime = table.Column<string>(nullable: true),
                    BonusTokensGenerated = table.Column<string>(nullable: true),
                    BonusType = table.Column<int>(nullable: false),
                    CreateDateTimeOffset = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusTx", x => x.InternalId);
                });

            migrationBuilder.CreateTable(
                name: "RegisteredTx",
                columns: table => new
                {
                    TxId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    ReferralCode = table.Column<string>(nullable: true),
                    AmountTransferredInEther = table.Column<string>(nullable: true),
                    AmountTransferredInToken = table.Column<string>(nullable: true),
                    EtherToUsdRateAtThatTime = table.Column<string>(nullable: true),
                    ReferralZinTokensGenerated = table.Column<string>(nullable: true),
                    BonusZinTokensGenerated = table.Column<string>(nullable: true),
                    PresaleZinTokensGenerated = table.Column<string>(nullable: true),
                    CreateDateTimeOffset = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredTx", x => x.TxId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BonusRate");

            migrationBuilder.DropTable(
                name: "BonusTx");

            migrationBuilder.DropTable(
                name: "RegisteredTx");

            migrationBuilder.DropColumn(
                name: "BonusZinTokens",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PresaleZinTokens",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReferralCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReferralZinTokens",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ZinTokens",
                table: "AspNetUsers");
        }
    }
}
