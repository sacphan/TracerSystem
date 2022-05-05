using Microsoft.EntityFrameworkCore.Migrations;

namespace TracerCafe.Data.Migrations
{
    public partial class Update_Customer_Table_Title_Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Customers");
        }
    }
}
