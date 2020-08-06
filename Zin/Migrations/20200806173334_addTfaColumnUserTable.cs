using Microsoft.EntityFrameworkCore.Migrations;

namespace Zin.Migrations
{
    public partial class addTfaColumnUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TfaCode",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TfaCode",
                table: "AspNetUsers");
        }
    }
}
