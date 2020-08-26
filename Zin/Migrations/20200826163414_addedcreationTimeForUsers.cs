using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Zin.Migrations
{
    public partial class addedcreationTimeForUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreateDateTimeOffset",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDateTimeOffset",
                table: "AspNetUsers");
        }
    }
}
